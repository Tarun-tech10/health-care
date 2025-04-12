// Login Modal Functions
function showLoginModal(type) {
    const modal = document.getElementById('loginModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Login`;
    modal.style.display = 'block';
    // Store the user type for form submission
    document.getElementById('loginForm').setAttribute('data-user-type', type);
}

function closeModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    // Clear form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = this.getAttribute('data-user-type');

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                userType
            })
        });

        const data = await response.json();

        if (data.success) {
            // Store user information in localStorage
            localStorage.setItem('userType', userType);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userId', data.id);

            // Redirect based on user type
            if (userType === 'patient') {
                window.location.href = 'dashboard.html';
            } else if (userType === 'doctor') {
                window.location.href = 'doctor-dashboard.html';
            }
        } else {
            alert(data.message || 'Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const userType = localStorage.getItem('userType');
    const currentPath = window.location.pathname;

    if (userType) {
        // If on index page and logged in, redirect to appropriate dashboard
        if (currentPath.endsWith('index.html') || currentPath === '/') {
            if (userType === 'patient') {
                window.location.href = 'dashboard.html';
            } else if (userType === 'doctor') {
                window.location.href = 'doctor-dashboard.html';
            }
        }
    } else {
        // If not logged in and trying to access dashboards, redirect to index
        if (currentPath.includes('dashboard')) {
            window.location.href = 'index.html';
        }
    }
}); 