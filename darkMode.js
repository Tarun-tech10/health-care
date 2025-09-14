// Check for saved user preference, if any
const darkModePreference = localStorage.getItem('darkMode');

// Function to enable dark mode
function enableDarkMode() {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('darkMode', 'enabled');
    document.getElementById('darkModeToggle').checked = true;
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('darkMode', null);
    document.getElementById('darkModeToggle').checked = false;
}

// Apply the saved preference when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check if user previously enabled dark mode
    if (darkModePreference === 'enabled') {
        enableDarkMode();
    }

    // Add event listener for toggle changes
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !darkModePreference) {
        enableDarkMode();
    }

    // Listen for system dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
}); 