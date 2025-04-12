// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set correct icon
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Add transition after initial load to prevent flash
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme); 