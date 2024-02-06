document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear input box

    if (userInput) {
        addToChatbox('You: ' + userInput);
        fetch('https://hello-world-shrill-night-d9f1.gentoogoon.workers.dev/', { // Replace with your Cloudflare Worker URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            addToChatbox('Bot: ' + data.choices[0].text); // Customize based on the response format
        })
        .catch(error => console.error('Error:', error));
    }
});

function addToChatbox(message) {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div>${message}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

