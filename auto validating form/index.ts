const inputFields = document.querySelectorAll(
  ".signup__field__inputs__input"
) as NodeListOf<HTMLInputElement>;

inputFields.forEach((inputField) => {
  inputField.addEventListener("blur", (event) =>
    validateField(event.target as HTMLInputElement)
  );
  inputField.addEventListener("keydown", (event) => restrictField(event));
});

class ValidationError extends Error {
  constructor(public message: string) {
    super();
    this.message = message;
  }
}

const restrictionFunctionsMap = {
    'day' : (event: Event) => isNumberRestricted(event as KeyboardEvent, 2),
    'year' : (event: Event) => isNumberRestricted(event as KeyboardEvent, 4)
};

type RestritedField = keyof typeof restrictionFunctionsMap;

function restrictField(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const shouldRestrict = restrictionFunctionsMap[target.dataset['field'] as RestritedField];

    if (shouldRestrict !== undefined) {
        if (shouldRestrict(event)) {
            event.preventDefault();
        }
    }
}

function isNumberRestricted(event: KeyboardEvent, maxLength: number) {
  const specialKeys = ["Enter", "Backspace", "Tab"];
  const target = event.target as HTMLInputElement;
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

function validateName(name: string) {
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    throw new ValidationError("Please enter a valid name");
  }
}

function validatePassword(password: string) {
  if (!password) {
    throw new ValidationError("Password cannot be empty");
  }
  if (password.length < 6) {
    throw new ValidationError("Password length too short");
  }
}

function validateConfirmPassword(password: string) {
  const passwordField = document.querySelector(
    ".signup__field__inputs__input--password"
  ) as HTMLInputElement;

  if (password && password !== passwordField.value) {
    throw new ValidationError("Password did not match");
  }
}

function validateEmail(email: string) {
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

function validateUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  if (!usernameRegex.test(username)) {
    throw new ValidationError("Please enter a valid username");
  }
}

function validateDay(day: string) {
  const dayRegex = /^[0-9]{1,2}$/;
  if (!dayRegex.test(day)) {
    throw new ValidationError("Please enter a valid day");
  }
}

function validateYear(year: string) {
  const yearRegex = /^[0-9]{4}$/;
  if (!yearRegex.test(year)) {
    throw new ValidationError("Please enter a valid year");
  }
}

function validatePhoneNumber(phoneNumber: string) {
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

type FormFieldName = keyof typeof validationMapping;

function validateField(inputField: HTMLInputElement) {
  const errorField = inputField.parentElement?.parentElement?.querySelector(
    ".signup__field__error"
  ) as HTMLInputElement;
  const fieldName = inputField.dataset["field"] as FormFieldName;

  if (!errorField) {
    return;
  }

  try {
    const validate = validationMapping[fieldName];
    validate(inputField.value);
    if (fieldName === "password") {
      //We also have to validate confirmationPassword field
      const confirmationPasswordElement = document.querySelector(
        ".signup__field__inputs__input--confirm-password"
      ) as HTMLInputElement;
      validateField(confirmationPasswordElement);
    }
    inputField.classList.remove("signup__field__input--error");
    errorField.innerHTML = "";
  } catch (exception) {
    if (!(exception instanceof ValidationError)) {
      throw exception;
    }
    inputField.classList.add("signup__field__input--error");
    errorField.innerHTML = exception.message;
  }
}
