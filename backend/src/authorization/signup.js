export async function handlesignup(request, env) {
    try {
        const data = await request.json(); // Parse the JSON data from the request body

        const id = crypto.randomUUID(); // Generate a unique ID for the new user

        // Hash the password using a secure hashing algorithm
        const encoder = new TextEncoder();

        const passwordHashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data.password));

        const hashedPassword = Array.from(new Uint8Array(passwordHashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

        const user = { id, name: data.name, email: data.email, password: hashedPassword }; // Create the user object with the hashed password

        await env.users.put(data.email, JSON.stringify(user));//Store the user data in the KV store, using the user's email as the key

        // Return a successful response with a message and the stored data
        return new Response(JSON.stringify({ message: 'Data Added Successfully', user }), 
        {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } 
    catch (error) 
    {
        console.error('Error in handlesignup:', error); // Log any errors that occur during the process

        return new Response('Error processing request', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
