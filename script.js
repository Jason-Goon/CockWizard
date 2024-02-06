document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear the input field

    if (userInput.trim()) {
        addToChatbox('You: ' + userInput);
        fetch('https://hello-world-shrill-night-d9f1.gentoogoon.workers.dev/', { // Your Cloudflare Worker URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ messages: [{ role: "user", content: userInput }] })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data); // Log the received data

            // Correctly accessing the message content
            if(data.choices && data.choices.length > 0 && data.choices[0].message) {
                const aiResponse = data.choices[0].message.content;
                addToChatbox('AI: ' + aiResponse);
            } else {
                addToChatbox('Unexpected response format or no response');
            }
        })
        .catch(error => {
            console.error('Error:', error);
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
