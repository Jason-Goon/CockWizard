addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const OPENAI_API_KEY = OPENAI_API_KEY; // Your Cloudflare environment variable for the API key

async function handleRequest(request) {
  if (request.method === "POST") {
    try {
      // Parse the incoming request to get the user's message
      const requestData = await request.json();

      // URL for the OpenAI GPT Chat API
      const openaiUrl = 'https://api.openai.com/v1/chat/completions';

      // Prepare the request for the OpenAI API
      const openaiResponse = await fetch(openaiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Specify the GPT model
          messages: requestData.messages // Pass the array of messages
        })
      });

      // Get the response from the OpenAI API
      const openaiData = await openaiResponse.json();

      // Return the OpenAI response to the frontend
      return new Response(JSON.stringify(openaiData), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      // In case of an error, return a simple error message
      return new Response('Error processing request: ' + error.message, { status: 500 });
    }
  } else {
    // If not a POST request, return a 405 Method Not Allowed
    return new Response('Method not allowed', { status: 405 });
  }
}
