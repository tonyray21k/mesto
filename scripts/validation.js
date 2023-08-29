function hideInputError(formElement, inputElement, settingsObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(formInputs) {
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function checkInputValidity(formElement, inputElement, settingsObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }

}

function showInputError(formElement, inputElement, errorMessage, settingsObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObject.errorClass);
}

function toggleSubmitButtonState(formInputs, formSubmitButton, settingsObject) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.disabled = true;
    formSubmitButton.classList.add(settingsObject.inactiveButtonClass);
  } else {
    formSubmitButton.disabled = false;
    formSubmitButton.classList.remove(settingsObject.inactiveButtonClass);
  }
}

function enableValidation(settingsObject) {
  const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formsList.forEach(formElement => {
    setEventListeners(formElement, settingsObject);
  })
}
function setEventListeners(formElement, settingsObject) {
  const formInputs = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));

  const formSubmitButton = formElement.querySelector(settingsObject.submitButtonSelector);

  toggleSubmitButtonState(formInputs, formSubmitButton, settingsObject);
  formInputs.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingsObject);
      toggleSubmitButtonState(formInputs, formSubmitButton, settingsObject);
    })
  })
}

enableValidation({
  formSelector: '.popup__fields',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active',
});