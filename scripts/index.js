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
        closePopup(currentPopup)
    }
};

export function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', pressKeyToClose);
    galleryValidation._resetValidation();
};

function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressKeyToClose);
};

data.popupList.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (
            event.target.classList.contains('popup') ||
            event.target.classList.contains('popup__close') ||
            event.target.classList.contains('popup__close-image')
        ) {
            closePopup(popup);
        }
    });
});

function renderIdPopup() {
    data.nameInput.value = data.yourName.textContent;
    data.jobInput.value = data.description.textContent;
    openPopup(data.idPopup);
};

function handleIdForm(evt) {
    evt.preventDefault();
    data.yourName.textContent = data.nameInput.value;
    data.description.textContent = data.jobInput.value;
    closePopup(data.idPopup);
    profileValidation.toggleButtonState();
    evt.target.reset();
};

function handleGalleryForm(evt) {
    evt.preventDefault();
    data.card.prepend(createCard({
        name: data.placeInput.value,
        link: data.imageInput.value
    }));
    closePopup(data.galleryPopup);
    galleryValidation.toggleButtonState();
    evt.target.reset();
};

const base = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error'
};

data.popupOpenButton.addEventListener('click', renderIdPopup);
data.formElement.addEventListener('submit', handleIdForm);
data.formElementGallery.addEventListener('submit', handleGalleryForm);
data.galleryEdit.addEventListener('click', () => openPopup(data.galleryPopup));
data.galleryPopupCloseButton.addEventListener('click', () => closePopup(data.galleryPopup));
data.imageCloseButton.addEventListener('click', () => closePopup(data.imagePopup));

const profileValidation = new FormValidator(base, data.formElement);
profileValidation.enableValidation();
const galleryValidation = new FormValidator(base, data.formElementGallery);
galleryValidation.enableValidation();




// Старый код.
//function imagePreview(evt) {
//openPopup(data.imagePopup);
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