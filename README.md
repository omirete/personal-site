# Personal website

## federicogiancarelli.com

Built with 🐒 using Typescript, Next.js, React, Bootstrap and Sass.

Backend: Vercel and MongoDB.

It has a simple admin panel to manage its content.

Feel free to use this as a template for your own site.

## Public content cache

Cache Components are enabled. Personal info, highlights, experience, projects,
and public page metadata use Next.js `use cache: remote`, with a shared tag and
the `max` lifetime. Vercel supplies the persistent remote cache handler, shared
across server instances. Local `next start` uses Next.js's in-memory fallback;
self-hosting needs a remote `cacheHandlers` implementation for persistence.
The supported public homepages are prerendered, so ordinary visits reuse their
HTML and cached collections without querying MongoDB.

After saving content, click **Refresh website cache** in the admin panel. It
sends an authenticated POST to `/api/invalidate-cache` and immediately expires all
public content. The next public render reads MongoDB and refills the cache;
later visits, including other languages, reuse it. Cache misses, expiry, and
new deployments can also read MongoDB. No runtime files are written to `public`.
Admin pages and database exports continue reading MongoDB directly. Entity API
routes handle create, update, and delete operations; reads come from the server pages.

Cache invalidation is manual through the signed-in admin session. There is no
scheduled cron job or cron secret to configure.

Run `npm run build`, then `npm run test:cache` to verify production cache reuse,
manual refresh, authorization, and direct admin reads. The smoke test
uses the local MongoDB and auth environment variables, instruments database
reads without logging document contents, and never writes database data.

See [Next.js remote caching](https://nextjs.org/docs/app/api-reference/directives/use-cache-remote)
and [tag revalidation](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).
