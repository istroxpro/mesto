'use strict'
import * as data from "./variables.js";
import {
    Card
} from "./card.js";
import {
    FormValidator
} from "./formValidator.js";

function createCard(item) {
    const newCard = new Card(item, '.cards__template');
    const cardElement = newCard.renderCard();
    return cardElement;
};

function renderInitialCards() {
    data.initialCards.forEach((item) => {
        const cardElement = createCard(item);
        data.card.append(cardElement);
    });
};

renderInitialCards();

const pressKeyToClose = (event) => {
    if (event.key === "Escape") {
        const currentPopup = document.querySelector('.popup_opened');
        popupClose(currentPopup)
    }
};

export function popupOpen(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', pressKeyToClose);
};

function popupClose(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressKeyToClose);
};

data.popupList.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (
            event.target.classList.contains('popup') ||
            event.target.classList.contains('popup__close')
        ) {
            popupClose(popup);
        }
    });
})

function renderIdPopup() {
    data.nameInput.value = data.yourName.textContent;
    data.jobInput.value = data.description.textContent;
    popupOpen(data.idPopup);
};

function handleIdForm(evt) {
    evt.preventDefault();
    data.yourName.textContent = data.nameInput.value;
    data.description.textContent = data.jobInput.value;
    popupClose(data.idPopup);
    profileValidation.toggleButtonState();
    evt.target.reset();
};

function handleGalleryForm(evt) {
    evt.preventDefault();
    data.card.prepend(createCard({
        name: data.placeInput.value,
        link: data.imageInput.value
    }));
    popupClose(data.galleryPopup);
    evt.target.reset();
    galleryValidation.toggleButtonState();
}

const base = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error'
};

data.popupOpenButton.addEventListener('click', renderIdPopup);
data.popupCloseButton.addEventListener('click', () => popupClose(data.idPopup));
data.formElement.addEventListener('submit', handleIdForm);
data.formElementGallery.addEventListener('submit', handleGalleryForm);
data.galleryEdit.addEventListener('click', () => popupOpen(data.galleryPopup));
data.galleryPopupCloseButton.addEventListener('click', () => popupClose(data.galleryPopup));
data.imageCloseButton.addEventListener('click', () => popupClose(data.imagePopup));

const profileValidation = new FormValidator(base, data.formElement);
profileValidation.enableValidation();
const galleryValidation = new FormValidator(base, data.formElementGallery);
galleryValidation.enableValidation();




// Старый код.
//function imagePreview(evt) {
//popupOpen(data.imagePopup);
//imageView.src = evt.target.src;
//imageText.textContent = evt.target.alt;
//};

//function likeIt() {
//this.classList.toggle('cards__like-button_active')
//};

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ

//function cardRemove(evt) {
//evt.target.closest('.cards__block').remove()
//};

//function renderCard(elem) {
//card.prepend(elem);
//};

// ДОБАВЛЕНИЕ ДЕФОЛТНОГО МАССИВА КАРТОЧЕК
//initialCards.forEach(function (elem) {
//const title = elem.name;
//const image = elem.link;

//renderCard(createCard(title, image));
//});