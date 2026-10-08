const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const { once } = require('node:events');
const { loadEnvConfig } = require('@next/env');
const { encode } = require('next-auth/jwt');

// Run after npm run build. Uses real MongoDB reads, but never writes data.
async function main() {
    loadEnvConfig(process.cwd());
    const email = process.env.AUTHORIZED_EMAILS?.split(',')[0];
    assert.ok(email && process.env.NEXTAUTH_SECRET, 'Configure local admin auth for this smoke test.');
    const token = await encode({ secret: process.env.NEXTAUTH_SECRET, token: { email, sub: 'cache-smoke-test' } });
    const adminHeaders = { cookie: `next-auth.session-token=${token}; __Secure-next-auth.session-token=${token}` };
    const port = 3110;
    let output = '';
    const server = spawn(process.execPath, [
        '--require', path.resolve('tests/mongo-query-probe.cjs'),
        'node_modules/next/dist/bin/next', 'start', '-p', String(port),
    ], { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
    server.stdout.on('data', chunk => { output += chunk.toString(); });
    server.stderr.on('data', chunk => { output += chunk.toString(); });
    const reads = () => (output.match(/\[mongo-read\]/g) || []).length;
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    async function request(url, options = {}, expectedStatus = 200) {
        const response = await fetch(`http://localhost:${port}${url}`, options);
        const body = await response.text();
        assert.equal(response.status, expectedStatus, `${options.method || 'GET'} ${url}`);
        if (['/', '/en', '/es', '/de'].includes(url)) {
            const locale = url === '/' ? 'en' : url.slice(1);
            assert.match(body, new RegExp(`<html lang="${locale}"`));
            assert.equal((body.match(/<html[ >]/g) || []).length, 1);
            assert.equal((body.match(/<body[ >]/g) || []).length, 1);
            assert.ok(!body.includes('__next_error__'), `${url} must render successfully after invalidation.`);
        }
        await sleep(150); // Allow Next.js pending cache writes/invalidation to settle.
        return response;
    }
    try {
        for (let i = 0; !output.includes('Ready in'); i++) {
            assert.ok(i < 100 && server.exitCode === null, 'Production server failed to start.');
            await sleep(100);
        }
        for (const url of ['/', '/en', '/es', '/de']) await request(url);
        assert.equal(reads(), 0, 'Prerendered public pages must not read MongoDB.');
        await request('/api/invalidate-cache', { method: 'POST' }, 401);
        await request('/api/invalidate-cache', {}, 405);
        assert.equal(reads(), 0, 'Unauthorized refreshes must not read MongoDB.');
        await request('/api/invalidate-cache', { method: 'POST', headers: adminHeaders });
        await request('/en');
        assert.ok(reads() > 0, 'A public render after invalidation must load fresh data.');
        let previousReads = reads();
        for (const url of ['/en', '/es', '/de', '/']) await request(url);
        assert.equal(reads(), previousReads, 'Public pages must share cached collections across locales.');
        await request('/api/invalidate-cache', { method: 'POST', headers: adminHeaders });
        await request('/en');
        assert.ok(reads() > previousReads, 'Repeated admin refreshes must invalidate public data.');
        previousReads = reads();
        await request('/en');
        assert.equal(reads(), previousReads, 'Repeated visits after admin refresh must reuse the cache.');
        for (const [endpoint, methods] of [
            ['/api/projects', ['POST', 'PUT', 'DELETE']],
            ['/api/highlights', ['POST', 'PUT', 'DELETE']],
            ['/api/experience', ['POST', 'PUT', 'DELETE']],
            ['/api/links', ['POST', 'PUT', 'DELETE']],
            ['/api/personal-info/basic-info', ['PUT']],
            ['/api/personal-info/contact-info', ['PUT']],
            ['/api/personal-info/social-networks', ['PUT']],
        ]) {
            previousReads = reads();
            await request(endpoint, {}, 405);
            const options = await request(endpoint, { method: 'OPTIONS' }, 204);
            const allowed = options.headers.get('allow')?.split(',').map(method => method.trim()) || [];
            for (const method of methods) {
                assert.ok(allowed.includes(method), `${endpoint} must retain ${method}.`);
            }
            assert.ok(!allowed.includes('GET'), `${endpoint} must not advertise GET.`);
            assert.equal(reads(), previousReads, `${endpoint} must not expose a database GET handler.`);
        }
        previousReads = reads();
        await request('/api/personal-info', {}, 404);
        assert.equal(reads(), previousReads, 'Removed personal-info endpoint must not read MongoDB.');
        for (const page of ['personal-info', 'highlights', 'experience', 'projects', 'links']) {
            previousReads = reads();
            await request(`/en/admin/${page}`, { headers: adminHeaders });
            assert.ok(reads() > previousReads, `Admin ${page} page must read MongoDB directly.`);
        }
        previousReads = reads();
        await request('/api/admin/export?collection=projects', {}, 401);
        assert.equal(reads(), previousReads, 'Signed-out exports must not query MongoDB.');
        const exported = await request('/api/admin/export?collection=projects', { headers: adminHeaders });
        assert.ok(reads() > previousReads, 'Authorized exports must read MongoDB directly.');
        assert.equal(exported.headers.get('cache-control'), 'private, no-store');
        assert.doesNotMatch(output, /Error:|blocking-route|Uncached data was accessed/);
        console.log('PASS: public cache reuse, manual invalidation, localized document rendering, removed entity GET handlers, authorization, direct admin pages/exports.');
    } finally {
        if (server.exitCode === null) {
            const exited = once(server, 'exit');
            server.kill();
            await exited;
        }
    }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
