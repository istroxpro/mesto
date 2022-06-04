export class FormValidator {
    constructor({
        ...base
    }, formElement) {
        this._data = {
            ...base
        };
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    };
    // Показываем ошибку
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._data.errorClass);
    };
    // Скрываем ошибку
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = ''
        inputElement.classList.remove(this._data.inputErrorClass);
        errorElement.classList.remove(this._data.errorClass);
    };
    // Валидация
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement)
        };
    };
    // Проверка на валидность
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    _disableSubmitButton() {
        this._buttonElement.classList.add(this._data.inactiveButtonClass);
        this._buttonElement.disabled = "disabled";
    };

    // Изменение отображения кнопки сабмита
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton()
        } else {
            this._buttonElement.classList.remove(this._data.inactiveButtonClass);
            this._buttonElement.disabled = "";
        }
    };
    resetValidation() {

        this.toggleButtonState();



        this._inputList.forEach((inputElement) => {

            this._hideInputError(inputElement)

        });



    };
    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };
    enableValidation() {
        this._setEventListeners();
    };
};