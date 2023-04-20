const inputFields = document.querySelectorAll(".signup__field__input");

inputFields.forEach((inputField) => {
  inputField.addEventListener("blur", validateField);
});

class ValidationError extends Error {
  constructor(public message: string) {
    super();
    this.message = message;
  }
}

function validateName(name: string) {
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    throw new ValidationError("Please enter a valid name");
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
};

type FormFieldName = keyof typeof validationMapping;

function validateField(event: Event) {
  const target = event.target as HTMLInputElement;
  const errorField = target?.parentElement?.querySelector(
    ".signup__field__error"
  );
  const fieldName = target.dataset["field"] as FormFieldName;
  
  if (!errorField) {
    return;
  }

  try {
    validationMapping[fieldName](target.value);
    target.classList.remove("signup__field__input--error");
    errorField.innerHTML = "";
  } catch (exception) {
    if (!(exception instanceof ValidationError)) {
        throw exception;
    }
    target.classList.add("signup__field__input--error");
    errorField.innerHTML = exception.message;
  }
}
