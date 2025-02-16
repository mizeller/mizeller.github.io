document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleDarkMode');
  const body = document.body;

  // Check for saved user preference, if any, on load of the website
  const darkMode = localStorage.getItem('darkMode');
  
  // If the user previously visited and enabled darkMode
  if (darkMode === 'enabled') {
    body.classList.add('dark');
  }

  toggle.addEventListener('click', () => {
    // Toggle dark mode on click
    body.classList.toggle('dark');
    
    // If dark mode is enabled, save the preference
    if (body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', null);
    }
  });
});