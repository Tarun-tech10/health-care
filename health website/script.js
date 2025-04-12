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
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = this.getAttribute('data-user-type');

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Store user information in localStorage
    localStorage.setItem('userType', userType);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', email.split('@')[0]); // Use email username as name

    // Redirect based on user type
    if (userType === 'patient') {
        window.location.href = 'patient-dashboard.html';
    } else if (userType === 'doctor') {
        window.location.href = 'doctor-dashboard.html';
    }
});

// Show registration form
function showRegistrationForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Register';
}

// Show login form
function showLoginForm() {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Login';
}

// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const userType = document.getElementById('loginForm').getAttribute('data-user-type');

    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Store registration info in localStorage
    localStorage.setItem('userType', userType);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);

    alert('Registration successful! Please login.');
    showLoginForm();
    // Clear registration form
    document.getElementById('regName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const userType = localStorage.getItem('userType');
    const currentPath = window.location.pathname;

    if (userType) {
        // If on index page and logged in, redirect to appropriate dashboard
        if (currentPath.endsWith('index.html') || currentPath === '/') {
            if (userType === 'patient') {
                window.location.href = 'patient-dashboard.html';
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