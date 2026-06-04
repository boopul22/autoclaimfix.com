
export interface Env {
    WEB3_FORM_API: string;
    ASSETS: Fetcher;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        // API endpoint to return the visitor's real IP (from Cloudflare edge)
        if (url.pathname === '/api/ip') {
            const ip = request.headers.get('CF-Connecting-IP')
                || request.headers.get('X-Forwarded-For')
                || 'Unknown';
            return new Response(JSON.stringify({ ip }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
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
