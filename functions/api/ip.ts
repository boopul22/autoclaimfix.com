// Cloudflare Pages Function — returns the visitor's real IP from the CF edge.
//
// This deploys as part of `wrangler pages deploy` (unlike src/worker.ts, which
// Pages never runs). Being same-origin, it is NOT blocked by ad-blockers the
// way third-party IP services (e.g. ipify) are. CF-Connecting-IP is always set
// by Cloudflare's edge, so the IP is reliable.
export const onRequest: PagesFunction = async (context) => {
    const ip = context.request.headers.get('CF-Connecting-IP')
        || context.request.headers.get('X-Forwarded-For')
        || 'Unknown';
    return new Response(JSON.stringify({ ip }), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store',
        },
    });
};
