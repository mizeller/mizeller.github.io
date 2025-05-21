document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleDarkMode');
    const modeIcon = document.getElementById('modeIcon');
    
    if (!toggleButton || !modeIcon) {
        console.warn('Dark mode elements not found');
        return;
    }

    // Set initial icon based on current mode
    updateIcon(localStorage.getItem('darkMode') === 'true');

    function updateIcon(isDark) {
        modeIcon.src = isDark ? '/assets/nxt_white.png' : '/assets/nxt.ico';
    }

    // Set initial state based on localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark-mode', isDarkMode);

    function toggleDarkMode() {
        const isDarkMode = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateIcon(isDarkMode);
        
        // Dispatch event for other components to react
        document.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { isDarkMode }
        }));
    }

    // Add click event listener
    toggleButton.addEventListener('click', toggleDarkMode);
});