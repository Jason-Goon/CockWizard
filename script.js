document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear the input field

    if (userInput.trim()) {
        addToChatbox('You: ' + userInput);
        fetch('https://hello-world-shrill-night-d9f1.gentoogoon.workers.dev/', { // Replace with your Cloudflare Worker URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ messages: [{ role: "user", content: userInput }] })
        })
        .then(response => {
            console.log('HTTP Response:', response); // Log the raw HTTP response
            return response.json();
        })
        .then(data => {
            console.log('Parsed Response Data:', data); // Log the parsed response data
            if (data.choices && data.choices.length > 0) {
                const aiResponse = data.choices[0].text; // Adjust based on the actual structure
                addToChatbox('AI: ' + aiResponse);
            } else {
                addToChatbox('No valid response from AI or unexpected format');
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            addToChatbox('Error: Could not fetch response');
        });
    }
});

function addToChatbox(message) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
}

