document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear the input field

    if (userInput) {
        addToChatbox('You: ' + userInput);
        fetch('https://hello-world-shrill-night-d9f1.gentoogoon.workers.dev/', { // Replace with your Cloudflare Worker URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Ensure to accept JSON response
            },
            body: JSON.stringify({ messages: [{ role: "user", content: userInput }] })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const aiResponse = data.choices[0].message.content;
            addToChatbox('AI: ' + aiResponse);
        })
        .catch(error => console.error('Error:', error));
    }
});

function addToChatbox(message) {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div>${message}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
}
