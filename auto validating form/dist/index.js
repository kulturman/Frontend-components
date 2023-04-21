"use strict";
const inputFields = document.querySelectorAll(".signup__field__inputs__input");
inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", event => validateField(event.target));
});
class ValidationError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.message = message;
    }
}
function validateName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
        throw new ValidationError("Please enter a valid name");
    }
}
function validatePassword(password) {
    if (!password) {
        throw new ValidationError("Password cannot be empty");
    }
    if (password.length < 6) {
        throw new ValidationError("Password length too short");
    }
}
function validateConfirmPassword(password) {
    const passwordField = document.querySelector('.signup__field__inputs__input--password');
    if (password && password !== passwordField.value) {
        throw new ValidationError("Password did not match");
    }
}
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9@._-]+[a-zA-Z]$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError("Please enter a valid email");
    }
    const necessaryEmailCharacters = ["@", "."];
    for (const necessaryEmailCharacter of necessaryEmailCharacters) {
        if (!email.includes(necessaryEmailCharacter)) {
            throw new ValidationError("Please enter a valid email");
        }
    }
}
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    if (!usernameRegex.test(username)) {
        throw new ValidationError("Please enter a valid username");
    }
}
function validateDay(day) {
    const dayRegex = /^[0-9]{1,2}$/;
    if (!dayRegex.test(day)) {
        throw new ValidationError("Please enter a valid day");
    }
}
function validateYear(year) {
    const yearRegex = /^[0-9]{4}$/;
    if (!yearRegex.test(year)) {
        throw new ValidationError("Please enter a valid year");
    }
}
function validatePhoneNumber(phoneNumber) {
    const FORMATTING_CHARACTERS = ["(", ")", "-"];
    function validateFormattedNumber() {
        const regex = /^[0-9(]{1}[0-9)-]+[0-9]$/;
        const hasOpeningParentheses = phoneNumber.includes("(");
        const hasClosingParentheses = phoneNumber.includes(")");
        if (hasOpeningParentheses && !hasClosingParentheses) {
            throw new ValidationError("Phone number missing closing parentheses");
        }
        if (!regex.test(phoneNumber)) {
            throw new ValidationError("Please enter valid phone number");
        }
    }
    function validateNonformattedNumber() {
        const regex = /^[0-9]+$/;
        if (!regex.test(phoneNumber)) {
            throw new ValidationError("Please enter valid phone number");
        }
    }
    for (const formattingCharacter of FORMATTING_CHARACTERS) {
        if (phoneNumber.includes(formattingCharacter)) {
            return validateFormattedNumber();
        }
    }
    validateNonformattedNumber();
}
const validationMapping = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    day: validateDay,
    year: validateYear,
    phoneNumber: validatePhoneNumber,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
};
function validateField(inputField) {
    var _a, _b;
    const errorField = (_b = (_a = inputField.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('.signup__field__error');
    const fieldName = inputField.dataset["field"];
    if (!errorField) {
        return;
    }
    try {
        const validate = validationMapping[fieldName];
        validate(inputField.value);
        if (fieldName === 'password') {
            //We also have to validate confirmationPassword field
            const confirmationPasswordElement = document.querySelector('.signup__field__inputs__input--confirm-password');
            validateField(confirmationPasswordElement);
        }
        inputField.classList.remove("signup__field__input--error");
        errorField.innerHTML = "";
    }
    catch (exception) {
        if (!(exception instanceof ValidationError)) {
            throw exception;
        }
        inputField.classList.add("signup__field__input--error");
        errorField.innerHTML = exception.message;
    }
}
//# sourceMappingURL=index.js.map