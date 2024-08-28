import { handleslogin } from "./authorization/login";
import { handlesignup } from "./authorization/signup";

const routes = {
    "/signup": handlesignup,
    "/login": handleslogin,
};

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*", // Change "*" to your frontend URL for better security
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const routeHandler = routes[pathname];

        // Handle preflight requests
        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: CORS_HEADERS,
            });
        }
        if (routeHandler) {
            const response = await routeHandler(request, env, ctx);
            return new Response(response.body, {
                ...response,
                headers: {
                    ...response.headers,
                    ...CORS_HEADERS, // Include CORS headers in the response
                },
            });
        }

        return new Response('NOT FOUND', { status: 404 });
    },
};
