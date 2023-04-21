import { validateField } from "./validation";

const inputFields = document.querySelectorAll(
  ".signup__field__inputs__input"
) as NodeListOf<HTMLInputElement>;

inputFields.forEach((inputField) => {
  inputField.addEventListener("blur", (event) =>
    validateField(event.target as HTMLInputElement)
  );
  inputField.addEventListener("keydown", (event) => restrictField(event));
});

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

