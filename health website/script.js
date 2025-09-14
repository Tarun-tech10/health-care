// Login Modal Functions
function showLoginModal(type) {
    console.log('showLoginModal called with type:', type);
    const modal = document.getElementById('loginModal');
    const userTypeSelect = document.getElementById('userType');
    const regUserTypeSelect = document.getElementById('regUserType');
    
    if (!modal || !userTypeSelect || !regUserTypeSelect) {
        console.error('Modal elements not found:', {
            modal: !!modal,
            userTypeSelect: !!userTypeSelect,
            regUserTypeSelect: !!regUserTypeSelect
        });
        return;
    }
    
    console.log('Setting userType values to:', type);
    userTypeSelect.value = type;
    regUserTypeSelect.value = type;
    console.log('Current values:', {
        loginUserType: userTypeSelect.value,
        regUserType: regUserTypeSelect.value
    });
    
    modal.style.display = 'block';
    showLoginForm(); // Ensure login form is visible
}

function showLoginForm() {
    console.log('Showing login form');
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    
    if (!loginForm || !registrationForm) {
        console.error('Forms not found:', {
            loginForm: !!loginForm,
            registrationForm: !!registrationForm
        });
        return;
    }
    
    loginForm.style.display = 'block';
    registrationForm.style.display = 'none';
}

function showRegistrationForm() {
    console.log('Showing registration form');
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    
    if (!loginForm || !registrationForm) {
        console.error('Forms not found:', {
            loginForm: !!loginForm,
            registrationForm: !!registrationForm
        });
        return;
    }
    
    loginForm.style.display = 'none';
    registrationForm.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('loginModal');
    if (!modal) return; // Exit if element doesn't exist
    
    modal.style.display = 'none';
    // Clear form fields
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (modal && event.target == modal) {
        closeModal();
    }
}

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');

    console.log('Forms found:', { 
        loginForm: !!loginForm, 
        registrationForm: !!registrationForm 
    });

    // Handle login form submission
    if (loginForm) {
        console.log('Adding submit event listener to login form');
        loginForm.addEventListener('submit', async function(e) {
            console.log('Login form submit event triggered');
            e.preventDefault();
            console.log('Default form submission prevented');
            
            const emailElement = document.getElementById('email');
            const passwordElement = document.getElementById('password');
            const userTypeElement = document.getElementById('userType');
            
            if (!emailElement || !passwordElement || !userTypeElement) {
                console.error('Form elements not found:', {
                    email: !!emailElement,
                    password: !!passwordElement,
                    userType: !!userTypeElement
                });
                alert('Form elements not found');
                return;
            }
            
            const email = emailElement.value;
            const password = passwordElement.value;
            const userType = userTypeElement.value;

            console.log('Form values before validation:', {
                email,
                password: password ? '[PRESENT]' : '[EMPTY]',
                userType
            });

            // Simple validation
            if (!email || !password) {
                console.log('Validation failed: missing required fields');
                alert('Please fill in all fields');
                return;
            }

            // Send login request to backend
            try {
                const requestBody = {
                    email: email,
                    password: password,
                    userType: userType
                };
                console.log('Sending login request to:', 'http://127.0.0.1:5000/api/login');
                console.log('Request body:', requestBody);
                
                const response = await fetch('http://127.0.0.1:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Login response:', result);
                
                if (result.success) {
                    console.log('Login successful, storing user data');
                    // Store user data in localStorage
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userName', result.name);
                    // Redirect based on user type
                    const redirectUrl = userType === 'doctor' ? './doctor-dashboard.html' : './patient-dashboard.html';
                    console.log('Redirecting to:', redirectUrl);
                    window.location.href = redirectUrl;
                } else {
                    console.log('Login failed:', result.message);
                    alert(result.message || 'Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again later.');
            }
        });
    }


    // Handle registration form submission
    if (registrationForm) {
        console.log('Adding submit event listener to registration form');
        registrationForm.addEventListener('submit', async function(e) {
            console.log('Registration form submit event triggered');
            e.preventDefault();
            console.log('Default form submission prevented');

            const nameElement = document.getElementById('regName');
            const emailElement = document.getElementById('regEmail');
            const passwordElement = document.getElementById('regPassword');
            const userTypeElement = document.getElementById('regUserType');

            if (!nameElement || !emailElement || !passwordElement || !userTypeElement) {
                console.error('Registration form elements not found:', {
                    name: !!nameElement,
                    email: !!emailElement,
                    password: !!passwordElement,
                    userType: !!userTypeElement
                });
                alert('Form elements not found');
                return;
            }

            const name = nameElement.value;
            const email = emailElement.value;
            const password = passwordElement.value;
            const userType = userTypeElement.value;

            console.log('Registration form values before validation:', {
                name,
                email,
                password: password ? '[PRESENT]' : '[EMPTY]',
                userType
            });

            if (!name || !email || !password || !userType) {
                console.log('Registration validation failed: missing required fields');
                alert('Please fill in all fields');
                return;
            }

            try {
                const requestBody = {
                    name: name,
                    email: email,
                    password: password,
                    userType: userType
                };
                console.log('Sending registration request to:', 'http://127.0.0.1:5000/api/register');
                console.log('Request body:', requestBody);

                const response = await fetch('http://127.0.0.1:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Registration response:', result);

                if (result.success) {
                    console.log('Registration successful, storing user data');
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userName', name);

                    const redirectUrl = userType === 'doctor' ? './doctor-dashboard.html' : './patient-dashboard.html';
                    console.log('Redirecting to:', redirectUrl);
                    window.location.href = redirectUrl;
                } else {
                    console.log('Registration failed:', result.message);
                    alert(result.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again later.');
            }
        });
    } else {
        console.error('Registration form not found');
    }
});

// Show registration form
function showRegistrationForm() {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const modalTitle = document.getElementById('modalTitle');
    
    if (loginForm) loginForm.style.display = 'none';
    if (registrationForm) registrationForm.style.display = 'block';
    if (modalTitle) modalTitle.textContent = 'Register';
}

// Show login form
function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const modalTitle = document.getElementById('modalTitle');
    
    if (registrationForm) registrationForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    if (modalTitle) modalTitle.textContent = 'Login';
    document.getElementById('modalTitle').textContent = 'Login';
}

// This event listener is now handled inside DOMContentLoaded
// Keeping this comment as a reference

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const userType = localStorage.getItem('userType');
    const currentPath = window.location.pathname;

    if (userType) {
        // If on index page and logged in, redirect to appropriate dashboard
        if (currentPath.endsWith('index.html') || currentPath === '/') {
            if (userType === 'patient') {
                window.location.href = './patient-dashboard.html';
            } else if (userType === 'doctor') {
                window.location.href = './doctor-dashboard.html';
            }
        }
    } else {
        // If not logged in and trying to access dashboards, redirect to index
        if (currentPath.includes('dashboard')) {
            window.location.href = './index.html';
        }
    }
});