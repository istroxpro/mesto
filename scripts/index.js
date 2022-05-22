'use strict'
// ПЕРЕМЕННЫЕ
const popupList = document.querySelectorAll('.popup');
const idPopup = document.querySelector('.popup_profile');
const galleryPopup = document.querySelector('.popup_gallery');
const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close_gallery');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const formElementGallery = document.querySelector('.popup__form_gallery');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_description');
const yourName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');
const cardsTemplate = document.querySelector('.cards__template').content;
const card = document.querySelector('.cards');
const galleryEdit = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__input_gallery_name');
const imageInput = document.querySelector('.popup__input_gallery_url');
const imagePopup = document.querySelector('.popup_view');
const imageExpand = document.querySelectorAll('.cards__image');
const imageCloseButton = imagePopup.querySelector('.popup__close_image');
const imageView = document.querySelector('.popup__imgs');
const imageText = document.querySelector('.popup__title_image');
const submitButton = galleryPopup.querySelector('.popup__submit-button');

// ФУНКЦИИ

function createCard(title, image) {
    const cardsElem = cardsTemplate.querySelector('.cards__block').cloneNode(true);
    const cardTitle = cardsElem.querySelector('.cards__title');
    const cardImage = cardsElem.querySelector('.cards__image')
    cardImage.src = image;
    cardImage.alt = title;
    cardTitle.textContent = title;
    cardsElem.querySelector('.cards__like-button').addEventListener('click', likeIt);
    cardsElem.querySelector('.cards__delete-button').addEventListener('click', cardRemove);
    cardImage.addEventListener('click', imagePreview);

    return cardsElem;
};

// ФУНКЦИИ ПРЕДПРОСМОТРА КАРТОЧКИ

function imagePreview(evt) {
    popupOpen(imagePopup);
    imageView.src = evt.target.src;
    imageText.textContent = evt.target.alt;
};

imageCloseButton.addEventListener('click', () => popupClose(imagePopup));

// ФУНКЦИЯ ЛАЙКА

function likeIt() {
    this.classList.toggle('cards__like-button_active')
};

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ

function cardRemove(evt) {
    evt.target.closest('.cards__block').remove()
};

function renderCard(elem) {
    card.prepend(elem);
    disableSubmitButton(submitButton, base)
};

// ДОБАВЛЕНИЕ ДЕФОЛТНОГО МАССИВА КАРТОЧЕК
initialCards.forEach(function (elem) {
    const title = elem.name;
    const image = elem.link;

    renderCard(createCard(title, image));
});

// POPUPS

// Закрытие попапа кнопкой ESC
const pressKeyToClose = (event) => {
    if (event.key === "Escape") {
        const currentPopup = document.querySelector('.popup_opened');
        popupClose(currentPopup)
    }
};

function popupOpen(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', pressKeyToClose);
};

function popupClose(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressKeyToClose);
};

// Закрытие попапа кликом по оверлею
popupList.forEach((popup) => {
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
    nameInput.value = yourName.textContent;
    jobInput.value = description.textContent;
    popupOpen(idPopup);
};

function handleIdForm(evt) {
    evt.preventDefault();
    yourName.textContent = nameInput.value;
    description.textContent = jobInput.value;
    popupClose(idPopup);
    evt.target.reset();
};

function handleGalleryForm(evt) {
    evt.preventDefault();
    const title = placeInput.value;
    const image = imageInput.value;
    renderCard(createCard(title, image));
    popupClose(galleryPopup)
    evt.target.reset();
}

// Слушатели

popupOpenButton.addEventListener('click', renderIdPopup);
popupCloseButton.addEventListener('click', () => popupClose(idPopup));
formElement.addEventListener('submit', handleIdForm);
formElementGallery.addEventListener('submit', handleGalleryForm);
galleryEdit.addEventListener('click', () => popupOpen(galleryPopup));
galleryPopupCloseButton.addEventListener('click', () => popupClose(galleryPopup));