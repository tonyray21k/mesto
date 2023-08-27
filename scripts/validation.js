const validationSettings = {
  formSelector: '.popup__fields',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active',
}


function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(formInputs) {
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }

}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.disabled = true;
    formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
  } else {
    formSubmitButton.disabled = false;
    formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function enableValidation(settingsObject) {
  const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    })
  })
}
function setEventListeners(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));

  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleSubmitButtonState(formInputs, formSubmitButton);
  formInputs.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButtonState(formInputs, formSubmitButton);
    })
  })
}

enableValidation({
  formSelector: '.popup__fields',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active',
});