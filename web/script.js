document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('input-form');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = userInput.value.trim();
      if (message === "") return;
  
      // Exibir mensagem do usuário
      addMessage('user', message);
      userInput.value = '';
  
      try {
        // Enviar mensagem para o Rasa
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: message })
        });
  
        const data = await response.json();
  
        // Exibir respostas do Rasa
        data.forEach(botMessage => {
          addMessage('bot', botMessage.text);
        });
      } catch (error) {
        console.error('Erro ao se comunicar com o Rasa:', error);
        addMessage('bot', 'Desculpe, ocorreu um erro ao processar sua mensagem.');
      }
    });
  
    function addMessage(sender, text) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender);
      messageElement.textContent = text;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
  