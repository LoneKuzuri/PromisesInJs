document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form from submitting the traditional way
  
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      if (!username || !password) {
        errorMsg.textContent = "Please fill out all fields.";
      } else {
        errorMsg.textContent = "";
        // Simulate successful login
        window.location.href = "main.html"; // Redirect to main page
      }
    });
  });
  