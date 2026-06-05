// Cloudflare Pages Function — returns the visitor's real IP plus all the geo /
// network data Cloudflare's edge knows about them.
//
// Deploys as part of `wrangler pages deploy` (unlike src/worker.ts, which Pages
// never runs). Same-origin, so not blocked by ad-blockers. CF-Connecting-IP and
// request.cf are always populated by Cloudflare's edge in production.
export const onRequest: PagesFunction = async (context) => {
    const { request } = context;
    const cf = (request.cf || {}) as Record<string, unknown>;
    const h = request.headers;

    const str = (v: unknown): string => (v === undefined || v === null ? '' : String(v));

    const data = {
        ip: h.get('CF-Connecting-IP') || h.get('X-Forwarded-For') || 'Unknown',
        country: str(cf.country),
        region: str(cf.region),
        city: str(cf.city),
        postalCode: str(cf.postalCode),
        latitude: str(cf.latitude),
        longitude: str(cf.longitude),
        timezone: str(cf.timezone),
        asn: str(cf.asn),
        isp: str(cf.asOrganization),
        colo: str(cf.colo),
        httpProtocol: str(cf.httpProtocol),
        tlsVersion: str(cf.tlsVersion),
        acceptLanguage: str(h.get('Accept-Language')),
    };

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store',
        },
    });
};
