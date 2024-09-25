document.addEventListener("DOMContentLoaded", function () {

    var form = document.querySelector("form");

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    var fullNameError = document.getElementById("fullNameError");
    var emailFeedback = document.getElementById("emailFeedback");
    var submitButton = document.getElementById('submitButton');

    var fullNameInput = document.getElementById("fullName");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var dobInput = document.getElementById("dob");
    var passwordFeedback = document.getElementById("passwordFeedback");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    var dobError = document.getElementById("dobError");

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Function to validate all inputs
    function validateForm() {
        var isValid = true;

        var fullName = fullNameInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;
        var dob = dobInput.value;

        // Full name validation
        if (fullName.length === 0) {
            fullNameError.innerText = "Name required";
            isValid = false;
        } else if (fullName.length < 3) {
            fullNameError.innerText = "Must be at least 3 characters long";
            isValid = false;
        } else {
            fullNameError.innerText = "";
        }

        // Email validation
        if (email === "") {
            emailFeedback.innerText = "Email required";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailFeedback.innerText = "Invalid email format";
            isValid = false;
        } else {
            emailFeedback.innerText = "";
        }

        // Password validation
        if (password === "") {
            passwordFeedback.innerText = "Password required";
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            passwordFeedback.innerText = "Password must be 8+ characters, including an uppercase letter, number, and special character.";
            isValid = false;
        } else {
            passwordFeedback.innerText = "";
        }

        // Confirm password validation
        if (confirmPassword === "") {
            confirmPasswordError.innerText = "Confirm your password";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.innerText = "Passwords do not match";
            isValid = false;
        } else {
            confirmPasswordError.innerText = "";
        }

        // Date of birth validation
        var dobDate = new Date(dob);
        var today = new Date();
        var age = today.getFullYear() - dobDate.getFullYear();
        if (age < 18) {
            dobError.innerText = "You must be at least 18 years old";
            isValid = false;
        } else {
            dobError.innerText = "";
        }

        // Enable or disable the submit button based on the form validity
        if (isValid) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", true);
        }
    }

    // Validate form on input in real-time
    emailInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
    fullNameInput.addEventListener("input", validateForm);
    confirmPasswordInput.addEventListener("input", validateForm);
    dobInput.addEventListener("input", validateForm);

    // Prevent form submission if not valid
    form.addEventListener("submit", function (event) {
        validateForm();
        if (submitButton.hasAttribute("disabled")) {
            event.preventDefault();
        }
    });

});
