document.getElementById('sendButton').addEventListener('click', function() {
  const userInput = document.getElementById('userInput').value;
  document.getElementById('userInput').value = ''; // Clear the input field

  if (userInput.trim()) {
    addToChatbox('You: ' + userInput);

    fetch('https://hello-world-shrill-night-d9f1.gentoogoon.workers.dev/', { // Update with the correct endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
      if (data.choices && data.choices.length > 0) {
        const aiResponse = data.choices[0].message.content;
        addToChatbox('AI: ' + aiResponse);
      } else {
        addToChatbox('Unexpected response format or no response');
      }
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
}
