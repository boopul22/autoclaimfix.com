
export interface Env {
    WEB3_FORM_API: string;
    ASSETS: Fetcher;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        // API endpoint: visitor's real IP + all geo/network data the CF edge knows.
        // This worker ALWAYS receives CF-Connecting-IP, so the IP is never missing.
        if (url.pathname === '/api/ip') {
            const cf = (request.cf || {}) as Record<string, unknown>;
            const h = request.headers;
            const s = (v: unknown): string => (v === undefined || v === null ? '' : String(v));

            const data = {
                ip: h.get('CF-Connecting-IP') || h.get('X-Forwarded-For') || 'Unknown',
                country: s(cf.country) || s(h.get('CF-IPCountry')),
                region: s(cf.region),
                city: s(cf.city),
                postalCode: s(cf.postalCode),
                latitude: s(cf.latitude),
                longitude: s(cf.longitude),
                timezone: s(cf.timezone),
                asn: s(cf.asn),
                isp: s(cf.asOrganization),
                colo: s(cf.colo),
                httpProtocol: s(cf.httpProtocol),
                tlsVersion: s(cf.tlsVersion),
                acceptLanguage: s(h.get('Accept-Language')),
            };

            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-store'
                }
            });
        }

        // API endpoint to serve environment variables
        if (url.pathname === '/api/config') {
            return new Response(JSON.stringify({
                WEB3_FORM_API: env.WEB3_FORM_API
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' // Allow CORS if needed, or adjust as necessary
                }
            });
        }

        // Serve static assets for all other requests
        return env.ASSETS.fetch(request);
    },
};
