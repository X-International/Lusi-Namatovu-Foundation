document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearMessages();

  // Get form values
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
    terms: document.getElementById("terms").checked,
  };

  // Validation
  const errors = [];

  if (!formData.name) errors.push("Name is required");
  if (!formData.email) {
    errors.push("Email is required");
  } else if (!validateEmail(formData.email)) {
    errors.push("Invalid email format");
  }
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.push("Invalid phone number format");
  }
  if (!formData.message) errors.push("Message is required");
  if (!formData.terms) errors.push("You must accept the terms and conditions");

  if (errors.length > 0) {
    showMessages(errors, "error");
    return;
  }

  submitForm(formData);
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return re.test(phone);
}

function clearMessages() {
  const responseElement = document.getElementById("responseMessage");
  responseElement.textContent = "";
  responseElement.className = "";
}

function showMessages(messages, type) {
  const responseElement = document.getElementById("responseMessage");
  responseElement.className = type;

  if (Array.isArray(messages)) {
    responseElement.innerHTML = `
            <ul class="error-list">
                ${messages.map((msg) => `<li>${msg}</li>`).join("")}
            </ul>
        `;
  } else {
    responseElement.textContent = messages;
  }
}

function submitForm(formData) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "php/contact.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          document.getElementById("contactForm").reset();
          showMessages(response.message, "success");
        } else {
          const errors = response.errors
            ? Object.values(response.errors)
            : [response.message];
          showMessages(errors, "error");
        }
      } catch (e) {
        showMessages("Error processing response", "error");
      }
    } else {
      showMessages("Message sent successfully!", "success");
    }
  };

  xhr.onerror = function () {
    showMessages("Network error. Please check your connection.", "error");
  };

  const params = new URLSearchParams(formData).toString();
  xhr.send(params);
}
