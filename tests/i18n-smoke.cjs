const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');

// Run after npm run build. Does not mutate database contents.
async function main() {
    const port = 3111;
    let output = '';
    const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    server.stdout.on('data', chunk => { output += chunk; });
    server.stderr.on('data', chunk => { output += chunk; });
    try {
        for (let i = 0; !output.includes('Ready in'); i++) {
            assert.ok(i < 100 && server.exitCode === null, 'Production server failed to start.');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const base = `http://localhost:${port}`;
        for (const [url, language, location] of [
            ['/', 'es-AR,es;q=0.9,en;q=0.8', '/es'],
            ['/admin/projects?sort=name', 'de-DE,de;q=0.9', '/de/admin/projects?sort=name'],
            ['/', 'fr-FR', '/en'],
            ['/', '*', '/en'],
            ['/', 'invalid_tag', '/en'],
            ['/', '', '/en'],
        ]) {
            const response = await fetch(base + url, { redirect: 'manual', headers: { 'accept-language': language } });
            assert.equal(response.status, 307, url);
            assert.equal(new URL(response.headers.get('location'), base).href, base + location);
            await response.arrayBuffer();
        }
        for (const [locale, greeting, login] of [
            ['en', 'Hello,', 'Sign in'], ['es', 'Hola,', 'Iniciar sesión'], ['de', 'Hallo,', 'Einloggen'],
        ]) {
            const response = await fetch(`${base}/${locale}`, { redirect: 'manual', headers: { 'accept-language': 'fr' } });
            assert.equal(response.status, 200);
            const html = await response.text();
            assert.match(html, new RegExp(`<html lang="${locale}"`));
            assert.equal((html.match(/<html[ >]/g) || []).length, 1);
            assert.equal((html.match(/<body[ >]/g) || []).length, 1);
            assert.ok(html.includes(greeting), `${locale} home must retain its translation.`);
            const unauthorized = await fetch(`${base}/${locale}/unauthorized`);
            const unauthorizedHtml = await unauthorized.text();
            assert.equal(unauthorized.status, 200);
            assert.ok(unauthorizedHtml.includes(login), `${locale} sign-in must use translated props.`);
            assert.ok(unauthorizedHtml.includes(`href="/${locale}"`));
            const admin = await fetch(`${base}/${locale}/admin/projects`);
            const adminHtml = await admin.text();
            assert.equal(admin.status, 200);
            assert.ok(
                admin.url.endsWith(`/${locale}/unauthorized`) || adminHtml.includes(`/${locale}/unauthorized`),
                `Signed-out ${locale} admin visits must redirect within the selected locale.`,
            );
        }
        const unsupported = await fetch(`${base}/fr`);
        assert.equal(unsupported.status, 404);
        await unsupported.arrayBuffer();
        for (const url of ['/en/missing-route', '/api/personal-info', '/missing.png']) {
            const response = await fetch(base + url, { redirect: 'manual' });
            assert.equal(response.status, 404, url);
            assert.equal(response.headers.get('location'), null);
            await response.arrayBuffer();
        }
        const robots = await fetch(`${base}/robots.txt`, { redirect: 'manual' });
        assert.equal(robots.status, 200);
        assert.equal(robots.headers.get('location'), null);
        await robots.arrayBuffer();
        assert.doesNotMatch(output, /Error:|blocking-route|Uncached data was accessed/);
        console.log('PASS: locale negotiation, query preservation, default fallback, translations, one root document, invalid locales, API and asset exclusions.');
    } finally {
        if (server.exitCode === null) {
            const exited = once(server, 'exit');
            server.kill();
            await exited;
        }
    }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
