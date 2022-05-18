const base = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error'
};

// Показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
};
// Скрываем ошибку
const hideInputError = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ''
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
};
// Валидация
const checkInputValidity = (formElement, inputElement, object) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, object)
    } else {
        hideInputError(formElement, inputElement, object)
    };
};
// Проверка на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Изменение отображения кнопки сабмита
const disablePopupButton = (button) => {
    button.classList.add("popup__submit-button_disabled");
    button.disabled = "disabled";
}

const toggleButtonState = (inputList, buttonElement, object) => {
    if (hasInvalidInput(inputList)) {
        disablePopupButton(buttonElement);
    } else {
        buttonElement.classList.remove(object.inactiveButtonClass);
        buttonElement.disabled = "";
    }
};

// Установка слушателей на формы
const setEventListeners = (formElement, object) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, object);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, object);
            toggleButtonState(inputList, buttonElement, object);
        });
    });
};
// Устанвка слушателя для валидации
const enableValidation = (object) => {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        setEventListeners(formElement, object);
    })
};

enableValidation(base);