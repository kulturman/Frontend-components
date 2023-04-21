const selectionElement = document.querySelector(
  ".signup__field__inputs__selection"
);
const selectionElementsBox = document.querySelector(
  ".signup__field__inputs__input__list"
);
const selectionElementsItems = document.querySelectorAll(
  ".signup__field__inputs__input__list__item"
);
const selectElementsLabel = document.querySelector(
  ".signup__field__inputs__input__label"
) as HTMLInputElement;
const selectionElementValue = document.querySelector(
  ".signup__field__inputs__input--birth-month"
) as HTMLInputElement;

export function handleComboBox() {
  selectionElementsItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const target = event.target as HTMLInputElement;
      const value = target.dataset["value"];
      selectionElementsBox?.setAttribute("style", "display: none");
      selectElementsLabel.innerText = target.innerText;
      selectionElementValue.value = value as string;
    });
  });

  selectionElement?.addEventListener("click", (event) => {
    //We want to know if we have clicked exactly on the block
    const target = event.target as HTMLInputElement;

    if (target.classList.contains("signup__field__inputs__selection")) {
      selectionElementsBox?.setAttribute("style", "display: block");
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLInputElement;
    //We check if we have clicked inside elements
    const element = target.closest(".signup__field__inputs__selection");

    if (!element) {
      selectionElementsBox?.setAttribute("style", "display: none");
    }
  });
}
