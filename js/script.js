
// Get the current year and set it in the footer
document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', function() {
  const menu = document.querySelector('.menu');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  // Check if user has scrolled to the bottom
  if (scrollPosition >= pageHeight) {
      menu.classList.add('hidden'); // Add hidden class to hide the menu
  } else {
      menu.classList.remove('hidden'); // Remove hidden class to show the menu
  }
});

const tween = KUTE.fromTo(
  '#blob1',
  {path: '#blob1'},
  {path: '#blob2'},
  {repeat: 999, duration: 3000, yoyo:true}
)

tween.start()