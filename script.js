document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear the input field

    if (userInput.trim()) {
        addToChatbox('You: ' + userInput);
        fetch('https://hello-world-shrill-night-d9f1.gentoogoon.workers.dev/', {
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
            if (!data.choices) {
                throw new Error('Data does not contain choices');
            }
            return data.choices[0].message.content;
        })
        .then(aiResponse => {
            addToChatbox('AI: ' + aiResponse);
        })
        .catch(error => {
            console.error('Error:', error);
            addToChatbox('Error: ' + error.message);
        });
    }
});

function addToChatbox(message) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}
