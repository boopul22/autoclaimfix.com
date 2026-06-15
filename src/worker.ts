import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export interface Env {
    WEB3_FORM_API: string;
    ASSETS: Fetcher;
    // `send_email` binding (declared in wrangler.jsonc). Sends mail FROM the
    // domain via Cloudflare Email Routing. Recipients must be VERIFIED
    // destination addresses in this account's Email Routing.
    SEND_EMAIL: SendEmail;
    // Optional shared secret that guards the /api/send-test route.
    SEND_TEST_TOKEN?: string;
}

// The verified sender for outbound mail.
const MAIL_FROM = "info@autoclaimfix.com";
const MAIL_FROM_NAME = "AutoClaimFix";

// Send an email from the domain through the SEND_EMAIL binding.
// `to` must be a verified Email Routing destination address.
async function sendMail(
    env: Env,
    opts: { to: string; subject: string; text?: string; html?: string }
): Promise<void> {
    const msg = createMimeMessage();
    msg.setSender({ name: MAIL_FROM_NAME, addr: MAIL_FROM });
    msg.setRecipient(opts.to);
    msg.setSubject(opts.subject);
    if (opts.html) msg.addMessage({ contentType: "text/html", data: opts.html });
    if (opts.text || !opts.html) {
        msg.addMessage({ contentType: "text/plain", data: opts.text ?? "" });
    }
    await env.SEND_EMAIL.send(new EmailMessage(MAIL_FROM, opts.to, msg.asRaw()));
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        // Token-guarded test endpoint to verify outbound email works.
        // POST /api/send-test?to=<verified-address>&token=<SEND_TEST_TOKEN>
        if (url.pathname === '/api/send-test' && request.method === 'POST') {
            const token = request.headers.get('x-send-token') || url.searchParams.get('token') || '';
            if (!env.SEND_TEST_TOKEN || token !== env.SEND_TEST_TOKEN) {
                return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
                    status: 401, headers: { 'Content-Type': 'application/json' }
                });
            }
            const to = url.searchParams.get('to') || 'bipul281b@gmail.com';
            try {
                await sendMail(env, {
                    to,
                    subject: 'AutoClaimFix worker test',
                    text: 'Test email sent from the autoclaimfix.com Worker via the SEND_EMAIL binding.',
                });
                return new Response(JSON.stringify({ ok: true, from: MAIL_FROM, to }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                return new Response(JSON.stringify({ ok: false, error: String(err) }), {
                    status: 500, headers: { 'Content-Type': 'application/json' }
                });
            }
        }

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
