/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const validation_1 = __webpack_require__(/*! ./validation */ "./src/validation.ts");
const inputFields = document.querySelectorAll(".signup__field__inputs__input");
inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", (event) => (0, validation_1.validateField)(event.target));
    inputField.addEventListener("keydown", (event) => restrictField(event));
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLGVBQWdCLFNBQVEsS0FBSztJQUNqQyxZQUFtQixPQUFlO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBRFMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBWTtJQUN2QyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQ3hEO0FBQ0gsQ0FBQztBQUxELG9DQUtDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsUUFBZ0I7SUFDL0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE1BQU0sSUFBSSxlQUFlLENBQUMsMEJBQTBCLENBQUMsQ0FBQztLQUN2RDtJQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxJQUFJLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQ3hEO0FBQ0gsQ0FBQztBQVBELDRDQU9DO0FBRUQsU0FBZ0IsdUJBQXVCLENBQUMsUUFBZ0I7SUFDdEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDMUMseUNBQXlDLENBQ3RCLENBQUM7SUFFdEIsSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7UUFDaEQsTUFBTSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQ3JEO0FBQ0gsQ0FBQztBQVJELDBEQVFDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQWE7SUFDekMsTUFBTSxVQUFVLEdBQUcsMENBQTBDLENBQUM7SUFDOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDM0IsTUFBTSxJQUFJLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QyxLQUFLLE1BQU0sdUJBQXVCLElBQUksd0JBQXdCLEVBQUU7UUFDOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUM1QyxNQUFNLElBQUksZUFBZSxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDekQ7S0FDRjtBQUNILENBQUM7QUFYRCxzQ0FXQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLFFBQWdCO0lBQy9DLE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDO0lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxlQUFlLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUM1RDtBQUNILENBQUM7QUFMRCw0Q0FLQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztJQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN2QixNQUFNLElBQUksZUFBZSxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDdkQ7QUFDSCxDQUFDO0FBTEQsa0NBS0M7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBWTtJQUN2QyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUM7SUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQ3hEO0FBQ0gsQ0FBQztBQUxELG9DQUtDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsV0FBbUI7SUFDckQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUMsU0FBUyx1QkFBdUI7UUFDOUIsTUFBTSxLQUFLLEdBQUcsMEJBQTBCLENBQUM7UUFDekMsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxJQUFJLHFCQUFxQixJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbkQsTUFBTSxJQUFJLGVBQWUsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLGVBQWUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUNELFNBQVMsMEJBQTBCO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksZUFBZSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBQ0QsS0FBSyxNQUFNLG1CQUFtQixJQUFJLHFCQUFxQixFQUFFO1FBQ3ZELElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzdDLE9BQU8sdUJBQXVCLEVBQUUsQ0FBQztTQUNsQztLQUNGO0lBQ0QsMEJBQTBCLEVBQUUsQ0FBQztBQUMvQixDQUFDO0FBekJELGtEQXlCQztBQUVZLHlCQUFpQixHQUFHO0lBQy9CLElBQUksRUFBRSxZQUFZO0lBQ2xCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsR0FBRyxFQUFFLFdBQVc7SUFDaEIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLGVBQWUsRUFBRSx1QkFBdUI7Q0FDekMsQ0FBQztBQUlGLFNBQWdCLGFBQWEsQ0FBQyxVQUE0Qjs7SUFDeEQsTUFBTSxVQUFVLEdBQUcsc0JBQVUsQ0FBQyxhQUFhLDBDQUFFLGFBQWEsMENBQUUsYUFBYSxDQUN2RSx1QkFBdUIsQ0FDSixDQUFDO0lBQ3RCLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFrQixDQUFDO0lBRS9ELElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixPQUFPO0tBQ1I7SUFFRCxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcseUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDNUIscURBQXFEO1lBQ3JELE1BQU0sMkJBQTJCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDeEQsaURBQWlELENBQzlCLENBQUM7WUFDdEIsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDNUM7UUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzNELFVBQVUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQzNCO0lBQUMsT0FBTyxTQUFTLEVBQUU7UUFDbEIsSUFBSSxDQUFDLENBQUMsU0FBUyxZQUFZLGVBQWUsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sU0FBUyxDQUFDO1NBQ2pCO1FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN4RCxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7S0FDMUM7QUFDSCxDQUFDO0FBN0JELHNDQTZCQzs7Ozs7OztVQ3hJRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsb0ZBQTZDO0FBRTdDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDM0MsK0JBQStCLENBQ0EsQ0FBQztBQUVsQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7SUFDakMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQzVDLDhCQUFhLEVBQUMsS0FBSyxDQUFDLE1BQTBCLENBQUMsQ0FDaEQsQ0FBQztJQUNGLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSx1QkFBdUIsR0FBRztJQUM1QixLQUFLLEVBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sRUFBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBc0IsRUFBRSxDQUFDLENBQUM7Q0FDM0UsQ0FBQztBQUlGLFNBQVMsYUFBYSxDQUFDLEtBQW9CO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUEwQixDQUFDO0lBQ2hELE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFtQixDQUFDLENBQUM7SUFFMUYsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO1FBQzlCLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBb0IsRUFBRSxTQUFpQjtJQUNqRSxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQTBCLENBQUM7SUFDaEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBRS9DLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbkMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7UUFDcEMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUUvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNwQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9hdXRvLXZhbGlkYXRpbmctZm9ybS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hdXRvLXZhbGlkYXRpbmctZm9ybS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBWYWxpZGF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgbmFtZVJlZ2V4ID0gL15bYS16QS1aXSskLztcbiAgaWYgKCFuYW1lUmVnZXgudGVzdChuYW1lKSkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBuYW1lXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgaWYgKCFwYXNzd29yZCkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQYXNzd29yZCBjYW5ub3QgYmUgZW1wdHlcIik7XG4gIH1cbiAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDYpIHtcbiAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGFzc3dvcmQgbGVuZ3RoIHRvbyBzaG9ydFwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVDb25maXJtUGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZykge1xuICBjb25zdCBwYXNzd29yZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWdudXBfX2ZpZWxkX19pbnB1dHNfX2lucHV0LS1wYXNzd29yZFwiXG4gICkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICBpZiAocGFzc3dvcmQgJiYgcGFzc3dvcmQgIT09IHBhc3N3b3JkRmllbGQudmFsdWUpIHtcbiAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGFzc3dvcmQgZGlkIG5vdCBtYXRjaFwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gIGNvbnN0IGVtYWlsUmVnZXggPSAvXlthLXpBLVowLTldezF9W2EtekEtWjAtOUAuXy1dK1thLXpBLVpdJC87XG4gIGlmICghZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbFwiKTtcbiAgfVxuICBjb25zdCBuZWNlc3NhcnlFbWFpbENoYXJhY3RlcnMgPSBbXCJAXCIsIFwiLlwiXTtcbiAgZm9yIChjb25zdCBuZWNlc3NhcnlFbWFpbENoYXJhY3RlciBvZiBuZWNlc3NhcnlFbWFpbENoYXJhY3RlcnMpIHtcbiAgICBpZiAoIWVtYWlsLmluY2x1ZGVzKG5lY2Vzc2FyeUVtYWlsQ2hhcmFjdGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsXCIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXJuYW1lUmVnZXggPSAvXlthLXpBLVowLTkuX10rJC87XG4gIGlmICghdXNlcm5hbWVSZWdleC50ZXN0KHVzZXJuYW1lKSkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCB1c2VybmFtZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVEYXkoZGF5OiBzdHJpbmcpIHtcbiAgY29uc3QgZGF5UmVnZXggPSAvXlswLTldezEsMn0kLztcbiAgaWYgKCFkYXlSZWdleC50ZXN0KGRheSkpIHtcbiAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF5XCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVllYXIoeWVhcjogc3RyaW5nKSB7XG4gIGNvbnN0IHllYXJSZWdleCA9IC9eWzAtOV17NH0kLztcbiAgaWYgKCF5ZWFyUmVnZXgudGVzdCh5ZWFyKSkge1xuICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCB5ZWFyXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcpIHtcbiAgY29uc3QgRk9STUFUVElOR19DSEFSQUNURVJTID0gW1wiKFwiLCBcIilcIiwgXCItXCJdO1xuICBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdHRlZE51bWJlcigpIHtcbiAgICBjb25zdCByZWdleCA9IC9eWzAtOShdezF9WzAtOSktXStbMC05XSQvO1xuICAgIGNvbnN0IGhhc09wZW5pbmdQYXJlbnRoZXNlcyA9IHBob25lTnVtYmVyLmluY2x1ZGVzKFwiKFwiKTtcbiAgICBjb25zdCBoYXNDbG9zaW5nUGFyZW50aGVzZXMgPSBwaG9uZU51bWJlci5pbmNsdWRlcyhcIilcIik7XG4gICAgaWYgKGhhc09wZW5pbmdQYXJlbnRoZXNlcyAmJiAhaGFzQ2xvc2luZ1BhcmVudGhlc2VzKSB7XG4gICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGhvbmUgbnVtYmVyIG1pc3NpbmcgY2xvc2luZyBwYXJlbnRoZXNlc1wiKTtcbiAgICB9XG4gICAgaWYgKCFyZWdleC50ZXN0KHBob25lTnVtYmVyKSkge1xuICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihcIlBsZWFzZSBlbnRlciB2YWxpZCBwaG9uZSBudW1iZXJcIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHZhbGlkYXRlTm9uZm9ybWF0dGVkTnVtYmVyKCkge1xuICAgIGNvbnN0IHJlZ2V4ID0gL15bMC05XSskLztcbiAgICBpZiAoIXJlZ2V4LnRlc3QocGhvbmVOdW1iZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKFwiUGxlYXNlIGVudGVyIHZhbGlkIHBob25lIG51bWJlclwiKTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBmb3JtYXR0aW5nQ2hhcmFjdGVyIG9mIEZPUk1BVFRJTkdfQ0hBUkFDVEVSUykge1xuICAgIGlmIChwaG9uZU51bWJlci5pbmNsdWRlcyhmb3JtYXR0aW5nQ2hhcmFjdGVyKSkge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlRm9ybWF0dGVkTnVtYmVyKCk7XG4gICAgfVxuICB9XG4gIHZhbGlkYXRlTm9uZm9ybWF0dGVkTnVtYmVyKCk7XG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9uTWFwcGluZyA9IHtcbiAgbmFtZTogdmFsaWRhdGVOYW1lLFxuICBlbWFpbDogdmFsaWRhdGVFbWFpbCxcbiAgdXNlcm5hbWU6IHZhbGlkYXRlVXNlcm5hbWUsXG4gIGRheTogdmFsaWRhdGVEYXksXG4gIHllYXI6IHZhbGlkYXRlWWVhcixcbiAgcGhvbmVOdW1iZXI6IHZhbGlkYXRlUGhvbmVOdW1iZXIsXG4gIHBhc3N3b3JkOiB2YWxpZGF0ZVBhc3N3b3JkLFxuICBjb25maXJtUGFzc3dvcmQ6IHZhbGlkYXRlQ29uZmlybVBhc3N3b3JkLFxufTtcblxuZXhwb3J0IHR5cGUgRm9ybUZpZWxkTmFtZSA9IGtleW9mIHR5cGVvZiB2YWxpZGF0aW9uTWFwcGluZztcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRmllbGQoaW5wdXRGaWVsZDogSFRNTElucHV0RWxlbWVudCkge1xuICBjb25zdCBlcnJvckZpZWxkID0gaW5wdXRGaWVsZC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZ251cF9fZmllbGRfX2Vycm9yXCJcbiAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBmaWVsZE5hbWUgPSBpbnB1dEZpZWxkLmRhdGFzZXRbXCJmaWVsZFwiXSBhcyBGb3JtRmllbGROYW1lO1xuXG4gIGlmICghZXJyb3JGaWVsZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdmFsaWRhdGUgPSB2YWxpZGF0aW9uTWFwcGluZ1tmaWVsZE5hbWVdO1xuICAgIHZhbGlkYXRlKGlucHV0RmllbGQudmFsdWUpO1xuICAgIGlmIChmaWVsZE5hbWUgPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgLy9XZSBhbHNvIGhhdmUgdG8gdmFsaWRhdGUgY29uZmlybWF0aW9uUGFzc3dvcmQgZmllbGRcbiAgICAgIGNvbnN0IGNvbmZpcm1hdGlvblBhc3N3b3JkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLnNpZ251cF9fZmllbGRfX2lucHV0c19faW5wdXQtLWNvbmZpcm0tcGFzc3dvcmRcIlxuICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgdmFsaWRhdGVGaWVsZChjb25maXJtYXRpb25QYXNzd29yZEVsZW1lbnQpO1xuICAgIH1cbiAgICBpbnB1dEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoXCJzaWdudXBfX2ZpZWxkX19pbnB1dC0tZXJyb3JcIik7XG4gICAgZXJyb3JGaWVsZC5pbm5lckhUTUwgPSBcIlwiO1xuICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICBpZiAoIShleGNlcHRpb24gaW5zdGFuY2VvZiBWYWxpZGF0aW9uRXJyb3IpKSB7XG4gICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgfVxuICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LmFkZChcInNpZ251cF9fZmllbGRfX2lucHV0LS1lcnJvclwiKTtcbiAgICBlcnJvckZpZWxkLmlubmVySFRNTCA9IGV4Y2VwdGlvbi5tZXNzYWdlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgdmFsaWRhdGVGaWVsZCB9IGZyb20gXCIuL3ZhbGlkYXRpb25cIjtcblxuY29uc3QgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICBcIi5zaWdudXBfX2ZpZWxkX19pbnB1dHNfX2lucHV0XCJcbikgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuaW5wdXRGaWVsZHMuZm9yRWFjaCgoaW5wdXRGaWVsZCkgPT4ge1xuICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIChldmVudCkgPT5cbiAgICB2YWxpZGF0ZUZpZWxkKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KVxuICApO1xuICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4gcmVzdHJpY3RGaWVsZChldmVudCkpO1xufSk7XG5cbmNvbnN0IHJlc3RyaWN0aW9uRnVuY3Rpb25zTWFwID0ge1xuICAgICdkYXknIDogKGV2ZW50OiBFdmVudCkgPT4gaXNOdW1iZXJSZXN0cmljdGVkKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQsIDIpLFxuICAgICd5ZWFyJyA6IChldmVudDogRXZlbnQpID0+IGlzTnVtYmVyUmVzdHJpY3RlZChldmVudCBhcyBLZXlib2FyZEV2ZW50LCA0KVxufTtcblxudHlwZSBSZXN0cml0ZWRGaWVsZCA9IGtleW9mIHR5cGVvZiByZXN0cmljdGlvbkZ1bmN0aW9uc01hcDtcblxuZnVuY3Rpb24gcmVzdHJpY3RGaWVsZChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IHNob3VsZFJlc3RyaWN0ID0gcmVzdHJpY3Rpb25GdW5jdGlvbnNNYXBbdGFyZ2V0LmRhdGFzZXRbJ2ZpZWxkJ10gYXMgUmVzdHJpdGVkRmllbGRdO1xuXG4gICAgaWYgKHNob3VsZFJlc3RyaWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNob3VsZFJlc3RyaWN0KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNOdW1iZXJSZXN0cmljdGVkKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtYXhMZW5ndGg6IG51bWJlcikge1xuICBjb25zdCBzcGVjaWFsS2V5cyA9IFtcIkVudGVyXCIsIFwiQmFja3NwYWNlXCIsIFwiVGFiXCJdO1xuICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgcHJvcG9zZWRJbnB1dCA9IHRhcmdldC52YWx1ZSArIGV2ZW50LmtleTtcblxuICBpZiAoc3BlY2lhbEtleXMuaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgaWYgKHByb3Bvc2VkSW5wdXQubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3QgbnVtYmVyUmVnZXggPSAvXlswLTldKyQvO1xuXG4gIGlmICghbnVtYmVyUmVnZXgudGVzdChwcm9wb3NlZElucHV0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9