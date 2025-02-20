function toggleSection(sectionId) {
  const section = document.querySelector(`#${sectionId}`).parentElement
  section.classList.toggle('collapsed')
}

// Optional: Initialize all sections as expanded
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.collapsible-section')
  sections.forEach((section) => {
    section.classList.add('collapsed') // Comment this line if you want sections to start expanded
  })
})
