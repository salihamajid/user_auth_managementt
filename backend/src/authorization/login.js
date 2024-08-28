export async function handleslogin(request, env) {
    try {
        const data = await request.json(); // Retrieve JSON data from the request

        const value = await env.users.get(data.email); // Fetch the user data from KV store using the email as the key

        const user = value ? JSON.parse(value) : null; // Convert the retrieved value from JSON string to an object

        if (user) {
            // Hash the provided password
            const encoder = new TextEncoder();
            const passwordHashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data.password));
            const hashedPassword = Array.from(new Uint8Array(passwordHashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

            if (user.password === hashedPassword) {
                // If the hashed passwords match, login is successful
                return new Response(
                    JSON.stringify({
                        message: 'YOU LOGGED IN',
                        user,
                    }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
        }

        // If the password doesn't match or the user is invalid
        return new Response(
            JSON.stringify({
                message: 'Invalid email or password',
            }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error in handleslogin:', error); // Log any errors that occur during the process

        return new Response('Error processing request', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
