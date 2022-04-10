// Переменные.

const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-button')
const popupCloseBtn = popup.querySelector('.popup__close')
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_profile-name')
const jobInput = document.querySelector('.popup__input_profile-description')
const yourName = document.querySelector('.profile__title')
const description = document.querySelector('.profile__subtitle')
const like = document.getElementsByClassName('cards__likeButton')

// Функции.

function popupOpen() {
    popup.classList.add('popup_opened')
    nameInput.textContent = yourName.value
    jobInput.textContent = description.value
}

function popupClose() {
    popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault()
    yourName.textContent = nameInput.value
    description.textContent = jobInput.value

    popupClose()
}

// Обработчики.

popupOpenBtn.addEventListener('click', popupOpen)
popupCloseBtn.addEventListener('click', popupClose)
formElement.addEventListener('submit', formSubmitHandler)