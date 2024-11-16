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
