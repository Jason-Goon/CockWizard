addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    // Parse the request to get the user's message
    const requestData = await request.json();
    const userMessage = requestData.message;

    // URL for the OpenAI GPT API
    const openaiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

    // Prepare the request for the OpenAI API
    const openaiRequest = new Request(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}` // Your OpenAI API key
      },
      body: JSON.stringify({
        prompt: userMessage,
        max_tokens: 150
      })
    });

    // Forward the request to the OpenAI API and get the response
    const openaiResponse = await fetch(openaiRequest);
    const openaiData = await openaiResponse.json();

    // Return the OpenAI response to the frontend
    return new Response(JSON.stringify(openaiData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    // Handle non-POST requests
    return new Response('This service only supports POST requests.', { status: 405 });
  }
}
