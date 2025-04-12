// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

// Common health questions and answers
const commonQuestions = {
    'What are the symptoms of COVID-19?': 'Common symptoms include fever, cough, fatigue, and loss of taste or smell. However, symptoms can vary from person to person.',
    'How can I boost my immune system?': 'You can boost your immune system by eating a balanced diet, getting regular exercise, maintaining a healthy weight, getting enough sleep, and managing stress.',
    'What should I do if I have a fever?': 'If you have a fever, rest, stay hydrated, and monitor your temperature. If it persists for more than 3 days or is very high, consult a doctor.',
    'How often should I exercise?': 'Adults should aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous exercise per week.',
    'What are the benefits of drinking water?': 'Water helps maintain body temperature, lubricates joints, aids digestion, and helps remove waste from the body.'
};

// AI responses for different types of queries
const aiResponses = {
    greeting: 'Hello! I\'m your AI health assistant. How can I help you today?',
    medical: 'I can provide general health information, but for specific medical advice, I recommend consulting with a healthcare professional.',
    appointment: 'I can help you schedule an appointment. Would you like to book one now?',
    prescription: 'For prescription-related queries, I recommend speaking with your doctor or pharmacist.',
    complex: 'This seems like a complex issue. Would you like to connect with a human healthcare professional?'
};

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(message) {
    // Check for common questions
    const lowerMessage = message.toLowerCase();
    for (const [question, answer] of Object.entries(commonQuestions)) {
        if (lowerMessage.includes(question.toLowerCase())) {
            return answer;
        }
    }

    // Categorize query and respond accordingly
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return aiResponses.greeting;
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('symptom') || lowerMessage.includes('diagnosis')) {
        return aiResponses.medical;
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('book')) {
        return aiResponses.appointment;
    } else if (lowerMessage.includes('prescription') || lowerMessage.includes('medicine') || lowerMessage.includes('medication')) {
        return aiResponses.prescription;
    } else {
        return aiResponses.complex;
    }
}

// Agent connection functionality
function connectToAgent() {
    const modal = document.getElementById('agentModal');
    modal.style.display = 'block';
}

function closeAgentModal() {
    const modal = document.getElementById('agentModal');
    modal.style.display = 'none';
}

// Handle agent form submission
document.getElementById('agentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const queryType = document.getElementById('queryType').value;
    const queryDescription = document.getElementById('queryDescription').value;

    // Here you would typically send this information to your backend
    // For demo purposes, we'll just show a success message
    alert('Your request has been submitted. An agent will connect with you shortly.');
    closeAgentModal();
});

// Show common questions
function showCommonQuestions() {
    const questions = Object.keys(commonQuestions);
    let message = 'Here are some common questions you can ask:\n\n';
    questions.forEach((question, index) => {
        message += `${index + 1}. ${question}\n`;
    });
    addMessage(message, 'ai');
}

// Handle Enter key in chat input
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Close modals when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('agentModal');
    if (event.target == modal) {
        closeAgentModal();
    }
} 