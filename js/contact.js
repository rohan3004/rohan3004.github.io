async function submitForm(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contactNo: document.getElementById("contactNo").value,
    message: document.getElementById("message").value,
  };

  const response = await fetch("https://api.rohandev.online/contact", {
    // Change to 8080 if that's where your Spring Boot app is running
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.text();
  alert(result);
}

//Scroll Funtionality for hiding the menu when scrolled down
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