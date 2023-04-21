/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/comboxBox.ts":
/*!**************************!*\
  !*** ./src/comboxBox.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleComboBox = void 0;
const selectionElement = document.querySelector(".signup__field__inputs__selection");
const selectionElementsBox = document.querySelector(".signup__field__inputs__input__list");
const selectionElementsItems = document.querySelectorAll(".signup__field__inputs__input__list__item");
const selectElementsLabel = document.querySelector(".signup__field__inputs__input__label");
const selectionElementValue = document.querySelector(".signup__field__inputs__input--birth-month");
function handleComboBox() {
    selectionElementsItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            const target = event.target;
            const value = target.dataset["value"];
            selectionElementsBox === null || selectionElementsBox === void 0 ? void 0 : selectionElementsBox.setAttribute("style", "display: none");
            selectElementsLabel.innerText = target.innerText;
            selectionElementValue.value = value;
        });
    });
    selectionElement === null || selectionElement === void 0 ? void 0 : selectionElement.addEventListener("click", (event) => {
        //We want to know if we have clicked exactly on the block
        const target = event.target;
        if (target.classList.contains("signup__field__inputs__selection")) {
            selectionElementsBox === null || selectionElementsBox === void 0 ? void 0 : selectionElementsBox.setAttribute("style", "display: block");
        }
    });
    document.addEventListener("click", (event) => {
        const target = event.target;
        //We check if we have clicked inside elements
        const element = target.closest(".signup__field__inputs__selection");
        if (!element) {
            selectionElementsBox === null || selectionElementsBox === void 0 ? void 0 : selectionElementsBox.setAttribute("style", "display: none");
        }
    });
}
exports.handleComboBox = handleComboBox;


/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateField = exports.validationMapping = exports.validatePhoneNumber = exports.validateYear = exports.validateDay = exports.validateUsername = exports.validateEmail = exports.validateConfirmPassword = exports.validatePassword = exports.validateName = void 0;
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
exports.validateName = validateName;
function validatePassword(password) {
    if (!password) {
        throw new ValidationError("Password cannot be empty");
    }
    if (password.length < 6) {
        throw new ValidationError("Password length too short");
    }
}
exports.validatePassword = validatePassword;
function validateConfirmPassword(password) {
    const passwordField = document.querySelector(".signup__field__inputs__input--password");
    if (password && password !== passwordField.value) {
        throw new ValidationError("Password did not match");
    }
}
exports.validateConfirmPassword = validateConfirmPassword;
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
exports.validateEmail = validateEmail;
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    if (!usernameRegex.test(username)) {
        throw new ValidationError("Please enter a valid username");
    }
}
exports.validateUsername = validateUsername;
function validateDay(day) {
    const dayRegex = /^[0-9]{1,2}$/;
    if (!dayRegex.test(day)) {
        throw new ValidationError("Please enter a valid day");
    }
}
exports.validateDay = validateDay;
function validateYear(year) {
    const yearRegex = /^[0-9]{4}$/;
    if (!yearRegex.test(year)) {
        throw new ValidationError("Please enter a valid year");
    }
}
exports.validateYear = validateYear;
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
exports.validatePhoneNumber = validatePhoneNumber;
exports.validationMapping = {
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
    const errorField = (_b = (_a = inputField.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector(".signup__field__error");
    const fieldName = inputField.dataset["field"];
    if (!errorField) {
        return;
    }
    try {
        const validate = exports.validationMapping[fieldName];
        validate(inputField.value);
        if (fieldName === "password") {
            //We also have to validate confirmationPassword field
            const confirmationPasswordElement = document.querySelector(".signup__field__inputs__input--confirm-password");
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
exports.validateField = validateField;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const comboxBox_1 = __webpack_require__(/*! ./comboxBox */ "./src/comboxBox.ts");
const validation_1 = __webpack_require__(/*! ./validation */ "./src/validation.ts");
const inputFields = document.querySelectorAll(".signup__field__inputs__input");
inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", (event) => (0, validation_1.validateField)(event.target));
    inputField.addEventListener("keydown", (event) => restrictField(event));
});
(0, comboxBox_1.handleComboBox)();
const restrictionFunctionsMap = {
    'day': (event) => isNumberRestricted(event, 2),
    'year': (event) => isNumberRestricted(event, 4)
};
function restrictField(event) {
    const target = event.target;
    const shouldRestrict = restrictionFunctionsMap[target.dataset['field']];
    if (shouldRestrict !== undefined) {
        if (shouldRestrict(event)) {
            event.preventDefault();
        }
    }
}
function isNumberRestricted(event, maxLength) {
    const specialKeys = ["Enter", "Backspace", "Tab"];
    const target = event.target;
    const proposedInput = target.value + event.key;
    if (specialKeys.includes(event.key)) {
        return false;
    }
    if (proposedInput.length > maxLength) {
        return true;
    }
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(proposedInput)) {
        return true;
    }
    return false;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvY29tYm94Qm94LnRzIiwid2VicGFjazovL2F1dG8tdmFsaWRhdGluZy1mb3JtLy4vc3JjL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VsZWN0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnNpZ251cF9fZmllbGRfX2lucHV0c19fc2VsZWN0aW9uXCJcbik7XG5jb25zdCBzZWxlY3Rpb25FbGVtZW50c0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnNpZ251cF9fZmllbGRfX2lucHV0c19faW5wdXRfX2xpc3RcIlxuKTtcbmNvbnN0IHNlbGVjdGlvbkVsZW1lbnRzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICBcIi5zaWdudXBfX2ZpZWxkX19pbnB1dHNfX2lucHV0X19saXN0X19pdGVtXCJcbik7XG5jb25zdCBzZWxlY3RFbGVtZW50c0xhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuc2lnbnVwX19maWVsZF9faW5wdXRzX19pbnB1dF9fbGFiZWxcIlxuKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3Qgc2VsZWN0aW9uRWxlbWVudFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuc2lnbnVwX19maWVsZF9faW5wdXRzX19pbnB1dC0tYmlydGgtbW9udGhcIlxuKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ29tYm9Cb3goKSB7XG4gIHNlbGVjdGlvbkVsZW1lbnRzSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC5kYXRhc2V0W1widmFsdWVcIl07XG4gICAgICBzZWxlY3Rpb25FbGVtZW50c0JveD8uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBub25lXCIpO1xuICAgICAgc2VsZWN0RWxlbWVudHNMYWJlbC5pbm5lclRleHQgPSB0YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgc2VsZWN0aW9uRWxlbWVudFZhbHVlLnZhbHVlID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgIH0pO1xuICB9KTtcblxuICBzZWxlY3Rpb25FbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgLy9XZSB3YW50IHRvIGtub3cgaWYgd2UgaGF2ZSBjbGlja2VkIGV4YWN0bHkgb24gdGhlIGJsb2NrXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNpZ251cF9fZmllbGRfX2lucHV0c19fc2VsZWN0aW9uXCIpKSB7XG4gICAgICBzZWxlY3Rpb25FbGVtZW50c0JveD8uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBibG9ja1wiKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAvL1dlIGNoZWNrIGlmIHdlIGhhdmUgY2xpY2tlZCBpbnNpZGUgZWxlbWVudHNcbiAgICBjb25zdCBlbGVtZW50ID0gdGFyZ2V0LmNsb3Nlc3QoXCIuc2lnbnVwX19maWVsZF9faW5wdXRzX19zZWxlY3Rpb25cIik7XG5cbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHNlbGVjdGlvbkVsZW1lbnRzQm94Py5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IG5vbmVcIik7XG4gICAgfVxuICB9KTtcbn1cbiIsImNsYXNzIFZhbGlkYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVOYW1lKG5hbWU6IHN0cmluZykge1xuICBjb25zdCBuYW1lUmVnZXggPSAvXlthLXpBLVpdKyQvO1xuICBpZiAoIW5hbWVSZWdleC50ZXN0KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG5hbWVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZykge1xuICBpZiAoIXBhc3N3b3JkKSB7XG4gICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBhc3N3b3JkIGNhbm5vdCBiZSBlbXB0eVwiKTtcbiAgfVxuICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgNikge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQYXNzd29yZCBsZW5ndGggdG9vIHNob3J0XCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUNvbmZpcm1QYXNzd29yZChwYXNzd29yZDogc3RyaW5nKSB7XG4gIGNvbnN0IHBhc3N3b3JkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZ251cF9fZmllbGRfX2lucHV0c19faW5wdXQtLXBhc3N3b3JkXCJcbiAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGlmIChwYXNzd29yZCAmJiBwYXNzd29yZCAhPT0gcGFzc3dvcmRGaWVsZC52YWx1ZSkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQYXNzd29yZCBkaWQgbm90IG1hdGNoXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcbiAgY29uc3QgZW1haWxSZWdleCA9IC9eW2EtekEtWjAtOV17MX1bYS16QS1aMC05QC5fLV0rW2EtekEtWl0kLztcbiAgaWYgKCFlbWFpbFJlZ2V4LnRlc3QoZW1haWwpKSB7XG4gICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsXCIpO1xuICB9XG4gIGNvbnN0IG5lY2Vzc2FyeUVtYWlsQ2hhcmFjdGVycyA9IFtcIkBcIiwgXCIuXCJdO1xuICBmb3IgKGNvbnN0IG5lY2Vzc2FyeUVtYWlsQ2hhcmFjdGVyIG9mIG5lY2Vzc2FyeUVtYWlsQ2hhcmFjdGVycykge1xuICAgIGlmICghZW1haWwuaW5jbHVkZXMobmVjZXNzYXJ5RW1haWxDaGFyYWN0ZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWxcIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgdXNlcm5hbWVSZWdleCA9IC9eW2EtekEtWjAtOS5fXSskLztcbiAgaWYgKCF1c2VybmFtZVJlZ2V4LnRlc3QodXNlcm5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBsZWFzZSBlbnRlciBhIHZhbGlkIHVzZXJuYW1lXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZURheShkYXk6IHN0cmluZykge1xuICBjb25zdCBkYXlSZWdleCA9IC9eWzAtOV17MSwyfSQvO1xuICBpZiAoIWRheVJlZ2V4LnRlc3QoZGF5KSkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXlcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlWWVhcih5ZWFyOiBzdHJpbmcpIHtcbiAgY29uc3QgeWVhclJlZ2V4ID0gL15bMC05XXs0fSQvO1xuICBpZiAoIXllYXJSZWdleC50ZXN0KHllYXIpKSB7XG4gICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBsZWFzZSBlbnRlciBhIHZhbGlkIHllYXJcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGhvbmVOdW1iZXIocGhvbmVOdW1iZXI6IHN0cmluZykge1xuICBjb25zdCBGT1JNQVRUSU5HX0NIQVJBQ1RFUlMgPSBbXCIoXCIsIFwiKVwiLCBcIi1cIl07XG4gIGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0dGVkTnVtYmVyKCkge1xuICAgIGNvbnN0IHJlZ2V4ID0gL15bMC05KF17MX1bMC05KS1dK1swLTldJC87XG4gICAgY29uc3QgaGFzT3BlbmluZ1BhcmVudGhlc2VzID0gcGhvbmVOdW1iZXIuaW5jbHVkZXMoXCIoXCIpO1xuICAgIGNvbnN0IGhhc0Nsb3NpbmdQYXJlbnRoZXNlcyA9IHBob25lTnVtYmVyLmluY2x1ZGVzKFwiKVwiKTtcbiAgICBpZiAoaGFzT3BlbmluZ1BhcmVudGhlc2VzICYmICFoYXNDbG9zaW5nUGFyZW50aGVzZXMpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQaG9uZSBudW1iZXIgbWlzc2luZyBjbG9zaW5nIHBhcmVudGhlc2VzXCIpO1xuICAgIH1cbiAgICBpZiAoIXJlZ2V4LnRlc3QocGhvbmVOdW1iZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGxlYXNlIGVudGVyIHZhbGlkIHBob25lIG51bWJlclwiKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdmFsaWRhdGVOb25mb3JtYXR0ZWROdW1iZXIoKSB7XG4gICAgY29uc3QgcmVnZXggPSAvXlswLTldKyQvO1xuICAgIGlmICghcmVnZXgudGVzdChwaG9uZU51bWJlcikpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQbGVhc2UgZW50ZXIgdmFsaWQgcGhvbmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IGZvcm1hdHRpbmdDaGFyYWN0ZXIgb2YgRk9STUFUVElOR19DSEFSQUNURVJTKSB7XG4gICAgaWYgKHBob25lTnVtYmVyLmluY2x1ZGVzKGZvcm1hdHRpbmdDaGFyYWN0ZXIpKSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGVGb3JtYXR0ZWROdW1iZXIoKTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVOb25mb3JtYXR0ZWROdW1iZXIoKTtcbn1cblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb25NYXBwaW5nID0ge1xuICBuYW1lOiB2YWxpZGF0ZU5hbWUsXG4gIGVtYWlsOiB2YWxpZGF0ZUVtYWlsLFxuICB1c2VybmFtZTogdmFsaWRhdGVVc2VybmFtZSxcbiAgZGF5OiB2YWxpZGF0ZURheSxcbiAgeWVhcjogdmFsaWRhdGVZZWFyLFxuICBwaG9uZU51bWJlcjogdmFsaWRhdGVQaG9uZU51bWJlcixcbiAgcGFzc3dvcmQ6IHZhbGlkYXRlUGFzc3dvcmQsXG4gIGNvbmZpcm1QYXNzd29yZDogdmFsaWRhdGVDb25maXJtUGFzc3dvcmQsXG59O1xuXG5leHBvcnQgdHlwZSBGb3JtRmllbGROYW1lID0ga2V5b2YgdHlwZW9mIHZhbGlkYXRpb25NYXBwaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChpbnB1dEZpZWxkOiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gIGNvbnN0IGVycm9yRmllbGQgPSBpbnB1dEZpZWxkLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuc2lnbnVwX19maWVsZF9fZXJyb3JcIlxuICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGZpZWxkTmFtZSA9IGlucHV0RmllbGQuZGF0YXNldFtcImZpZWxkXCJdIGFzIEZvcm1GaWVsZE5hbWU7XG5cbiAgaWYgKCFlcnJvckZpZWxkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB2YWxpZGF0ZSA9IHZhbGlkYXRpb25NYXBwaW5nW2ZpZWxkTmFtZV07XG4gICAgdmFsaWRhdGUoaW5wdXRGaWVsZC52YWx1ZSk7XG4gICAgaWYgKGZpZWxkTmFtZSA9PT0gXCJwYXNzd29yZFwiKSB7XG4gICAgICAvL1dlIGFsc28gaGF2ZSB0byB2YWxpZGF0ZSBjb25maXJtYXRpb25QYXNzd29yZCBmaWVsZFxuICAgICAgY29uc3QgY29uZmlybWF0aW9uUGFzc3dvcmRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuc2lnbnVwX19maWVsZF9faW5wdXRzX19pbnB1dC0tY29uZmlybS1wYXNzd29yZFwiXG4gICAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICB2YWxpZGF0ZUZpZWxkKGNvbmZpcm1hdGlvblBhc3N3b3JkRWxlbWVudCk7XG4gICAgfVxuICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZShcInNpZ251cF9fZmllbGRfX2lucHV0LS1lcnJvclwiKTtcbiAgICBlcnJvckZpZWxkLmlubmVySFRNTCA9IFwiXCI7XG4gIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgIGlmICghKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIFZhbGlkYXRpb25FcnJvcikpIHtcbiAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICB9XG4gICAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKFwic2lnbnVwX19maWVsZF9faW5wdXQtLWVycm9yXCIpO1xuICAgIGVycm9yRmllbGQuaW5uZXJIVE1MID0gZXhjZXB0aW9uLm1lc3NhZ2U7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBoYW5kbGVDb21ib0JveCB9IGZyb20gXCIuL2NvbWJveEJveFwiO1xuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZCB9IGZyb20gXCIuL3ZhbGlkYXRpb25cIjtcblxuY29uc3QgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICBcIi5zaWdudXBfX2ZpZWxkX19pbnB1dHNfX2lucHV0XCJcbikgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuaW5wdXRGaWVsZHMuZm9yRWFjaCgoaW5wdXRGaWVsZCkgPT4ge1xuICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIChldmVudCkgPT5cbiAgICB2YWxpZGF0ZUZpZWxkKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KVxuICApO1xuICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4gcmVzdHJpY3RGaWVsZChldmVudCkpO1xufSk7XG5cbmhhbmRsZUNvbWJvQm94KCk7XG5cbmNvbnN0IHJlc3RyaWN0aW9uRnVuY3Rpb25zTWFwID0ge1xuICAgICdkYXknIDogKGV2ZW50OiBFdmVudCkgPT4gaXNOdW1iZXJSZXN0cmljdGVkKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQsIDIpLFxuICAgICd5ZWFyJyA6IChldmVudDogRXZlbnQpID0+IGlzTnVtYmVyUmVzdHJpY3RlZChldmVudCBhcyBLZXlib2FyZEV2ZW50LCA0KVxufTtcblxudHlwZSBSZXN0cml0ZWRGaWVsZCA9IGtleW9mIHR5cGVvZiByZXN0cmljdGlvbkZ1bmN0aW9uc01hcDtcblxuZnVuY3Rpb24gcmVzdHJpY3RGaWVsZChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IHNob3VsZFJlc3RyaWN0ID0gcmVzdHJpY3Rpb25GdW5jdGlvbnNNYXBbdGFyZ2V0LmRhdGFzZXRbJ2ZpZWxkJ10gYXMgUmVzdHJpdGVkRmllbGRdO1xuXG4gICAgaWYgKHNob3VsZFJlc3RyaWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNob3VsZFJlc3RyaWN0KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNOdW1iZXJSZXN0cmljdGVkKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtYXhMZW5ndGg6IG51bWJlcikge1xuICBjb25zdCBzcGVjaWFsS2V5cyA9IFtcIkVudGVyXCIsIFwiQmFja3NwYWNlXCIsIFwiVGFiXCJdO1xuICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgcHJvcG9zZWRJbnB1dCA9IHRhcmdldC52YWx1ZSArIGV2ZW50LmtleTtcblxuICBpZiAoc3BlY2lhbEtleXMuaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgaWYgKHByb3Bvc2VkSW5wdXQubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3QgbnVtYmVyUmVnZXggPSAvXlswLTldKyQvO1xuXG4gIGlmICghbnVtYmVyUmVnZXgudGVzdChwcm9wb3NlZElucHV0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9