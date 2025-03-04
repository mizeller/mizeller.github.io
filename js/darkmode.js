document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleDarkMode')
  const body = document.body
  const darkMode = localStorage.getItem('darkMode')
  
  // Create the icon elements
  const lightIcon = document.createElement('img')
  lightIcon.src = '/assets/nxt.ico'
  lightIcon.alt = 'Toggle'
  lightIcon.width = 16
  lightIcon.height = 16
  
  const darkIcon = document.createElement('img')
  darkIcon.src = '/assets/nxt_white.png'
  darkIcon.alt = 'Toggle'
  darkIcon.width = 16
  darkIcon.height = 16
  
  // Clear any existing content in toggle
  toggle.innerHTML = ''
  
  // Add icons to toggle
  toggle.appendChild(lightIcon)
  toggle.appendChild(darkIcon)
  
  // Function to update icon visibility
  const updateIconVisibility = () => {
    if (body.classList.contains('dark')) {
      lightIcon.style.display = 'none'
      darkIcon.style.display = 'inline'
    } else {
      lightIcon.style.display = 'inline'
      darkIcon.style.display = 'none'
    }
  }
  
  // Initial setup
  if (darkMode === 'enabled') {
    body.classList.add('dark')
  }
  updateIconVisibility()
  
  // Toggle functionality
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark')
    if (body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled')
    } else {
      localStorage.setItem('darkMode', null)
    }
    updateIconVisibility()
  })
})