document.addEventListener("DOMContentLoaded", function () {

    var form = document.querySelector("form");
    var indicator = document.getElementById('indicator');

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");


    var fullNameError = document.getElementById("fullNameError");
    var emailFeedback = document.getElementById("emailFeedback");

    var submitButton = document.getElementById('submitButton');

    var weak = document.getElementById('weak');
    var medium = document.getElementById('medium');
    var strong = document.getElementById('strong');

    
    form.addEventListener("submit", function (event) {
        var fullName = document.getElementById("fullName").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var dob = document.getElementById("dob").value;
        var passwordFeedback = document.getElementById("passwordFeedback");
        var confirmPasswordError = document.getElementById("confirmPasswordError");
        var dobError = document.getElementById("dobError");
        
        var email = emailInput.value;
        var password = passwordInput.value;
        
        var isValid = true;

        if (fullName.length === 0) {
            fullNameError.innerText = "Name required";
            isValid = false;
        } else if (fullName.length < 3) {
            fullNameError.innerText = "Must be at least 3 characters long"
            isValid = false;
        } else {
            fullNameError.innerText = "";
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailFeedback.innerText = "Email required";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailFeedback.innerText = "Invalid email format"
            isValid = false;
        } else {
            emailFeedback.innerText = "";
        }

        var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (password === "") {
            passwordFeedback.innerText = "password required";
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            passwordFeedback.innerText = "Password must be 8+ characters, including an uppercase letter, number, and special character.";
            isValid = false;
        }


        if (confirmPassword === "") {
            confirmPasswordError.innerText = "confirm your password";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.innerText = "Passwords do not match";
            isValid = false;
        } else {
            confirmPasswordError.innerText = "";
        }

        var dobDate = new Date(dob);
        var today = new Date();
        var age = today.getFullYear() - dobDate.getFullYear();
        if (age < 18) {
            dobError.innerText = "You must be at least 18 years old";
            isValid = false;
        }

        if(isValid) {
            submitButton.removeAttribute("disabled");
        } else {
            // prevent submission if any validation fails
            event.preventDefault();
        }

    });




    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // listening for email input in real time

    emailInput.addEventListener("input", function () {

        const emailValue = emailInput.value;
        if (emailValue === "") {
            emailFeedback.innerText = "";
            
        } else if (!emailRegex.test(emailValue)) {
            weak.classList.remove('init-weak');
            emailFeedback.innerText = "Invalid email format";
            emailFeedback.classList.remove('valid');
            emailFeedback.classList.add('error');
        } else {
            emailFeedback.innerText = "valid email";
            emailFeedback.classList.remove('error');
            emailFeedback.classList.add('valid');
        }

    });

    var weakPasswordRegex = /^[A-Za-z]{6,}$/;
    var mediumPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


    // listening for password input in real time
    passwordInput.addEventListener("input", function () {
        const passwordValue = passwordInput.value;


        if(passwordValue === '') {
            passwordFeedback.innerText = '';
            indicator.classList.remove('show-indicator');
            weak.classList.add('init-weak');
            weak.classList.remove('weak');

            medium.classList.add('init-medium');
            medium.classList.remove('medium');

            strong.classList.add('init-strong');
            strong.classList.remove('strong');

        } else if(weakPasswordRegex.test(passwordValue)) {
            weak.classList.remove('init-weak');
            weak.classList.add('weak');

            medium.classList.add('init-medium');
            medium.classList.remove('medium');

            indicator.classList.add('show-indicator');
            passwordFeedback.innerText = "Password must be 8+ characters, including an uppercase letter, number, and special character.";
            passwordFeedback.classList.remove('valid');
            passwordFeedback.classList.add('error');
        } else if(mediumPasswordRegex.test(passwordValue)) {
            weak.classList.remove('init-weak');
            weak.classList.add('weak');

            strong.classList.add('init-strong');
            strong.classList.remove('strong');

            medium.classList.remove('init-medium');
            medium.classList.add('medium');
            indicator.classList.add('show-indicator');
            passwordFeedback.innerText = "Password must be 8+ characters, including an uppercase letter, number, and special character.";
            passwordFeedback.classList.remove('valid');
            passwordFeedback.classList.add('error');
        } else if(strongPasswordRegex.test(passwordValue)) {
            weak.classList.remove('init-weak');
            weak.classList.add('weak');
            medium.classList.remove('init-medium');
            medium.classList.add('medium');
            strong.classList.remove('init-strong');
            strong.classList.add('strong');
            indicator.classList.add('show-indicator');
            passwordFeedback.innerText = "valid password";
            passwordFeedback.classList.remove('error');
            passwordFeedback.classList.add('valid');
        } else {
            passwordFeedback.innerText = "Password must be 8+ characters, including an uppercase letter, number, and special character.";
            indicator.classList.add('show-indicator');

        }

    });

});

