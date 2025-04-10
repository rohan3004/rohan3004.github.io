/*!
 * Copyright © 2025 Rohan Chakravarty.
 * All Rights Reserved.
 *
 * Licensed under the MIT License.
 * You may obtain a copy of the License at
 *      https://rohandev.online/LICENSE
 *
 * This file is provided "as is", without warranty of any kind.
 */

async function submitForm(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contactNo: document.getElementById("contactNo").value,
    message: document.getElementById("message").value,
  };

  const response = await fetch("https://api.rohandev.online/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.text();
  // alert(result);

  const msg = document.querySelector(".TitleBar");
  msg.innerText = `${result}`;
}


//clear form function
function clearForm() {
  // Clear all input fields
  document.getElementById('form').reset();
  const msg = document.querySelector(".TitleBar");
  msg.innerText = "";

  // Hide success message if displayed
  // document.getElementById('successMessage').style.display = 'none';
}

//Scroll Funtionality for hiding the menu when scrolled down
window.addEventListener('scroll', function () {
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