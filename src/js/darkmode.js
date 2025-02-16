document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleDarkMode');
    const body = document.body;

    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        body.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', null);
        }
    });
});