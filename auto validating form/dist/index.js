"use strict";
const inputFields = document.querySelectorAll(".signup__field__input");
inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", validateField);
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
};
function validateField(event) {
    var _a;
    const target = event.target;
    const errorField = (_a = target === null || target === void 0 ? void 0 : target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".signup__field__error");
    const fieldName = target.dataset["field"];
    if (!errorField) {
        return;
    }
    try {
        validationMapping[fieldName](target.value);
        target.classList.remove("signup__field__input--error");
        errorField.innerHTML = "";
    }
    catch (exception) {
        if (!(exception instanceof ValidationError)) {
            throw exception;
        }
        target.classList.add("signup__field__input--error");
        errorField.innerHTML = exception.message;
    }
}
//# sourceMappingURL=index.js.map