'use strict'
// ПЕРЕМЕННЫЕ

const idPopup = document.querySelector('.popup');
const galleryPopup = document.querySelector('.popup_gallery');
const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close_gallery');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = idPopup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const formElementGallery = document.querySelector('.popup__form_gallery');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_description');
const yourName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');
const closeButton = document.getElementsByClassName('cards__delete-button')
const cardsTemplate = document.querySelector('.cards__template').content;
const card = document.querySelector('.cards');
const galleryEdit = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__input_gallery_name');
const imageInput = document.querySelector('.popup__input_gallery_url');

// ДЕФОЛТНЫЙ МАССИВ КАРТОЧЕК

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    }
];

const imagePopup = document.querySelector('.popup_view');
const imageExpand = document.querySelectorAll('.cards__image');
const imageCloseButton = imagePopup.querySelector('.popup__close_image');
const imageView = document.querySelector('.popup__imgs');
const imageText = document.querySelector('.popup__title_image');

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
    cardsElem.querySelector('.cards__image').addEventListener('click', imagePreview);
    imageCloseButton.addEventListener('click', imagePreview);

    // ФУНКЦИЯ ЛАЙКА

    function likeIt() {
        this.classList.toggle('cards__like-button_active')
    };

    // ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ

    function cardRemove(evt) {
        evt.target.closest('.cards__block').remove()
    };

    // ФУНКЦИИ ПРЕДПРОСМОТРА КАРТОЧКИ

    function imagePreview(evt) {
        popupOpen(imagePopup);
        imageView.src = evt.target.src;
        imageText.textContent = evt.target.alt;
    };

    imageCloseButton.addEventListener('click', () => popupClose(imagePopup));

    return cardsElem;
};

function renderCard(elem) {
    card.prepend(elem);
};

// ДОБАВЛЕНИЕ ДЕФОЛТНОГО МАССИВА КАРТОЧЕК
initialCards.forEach(function (elem) {
    const title = elem.name;
    const image = elem.link;

    renderCard(createCard(title, image));
});

// POPUPS

function popupOpen(item) {
    item.classList.add('popup_opened');
};

function popupClose(item) {
    item.classList.remove('popup_opened');
};

function popupIdRender() {
    popupOpen(idPopup);
    nameInput.value = yourName.textContent;
    jobInput.value = description.textContent;
};

function idFormSubmitHandler(evt) {
    evt.preventDefault();
    yourName.textContent = nameInput.value;
    description.textContent = jobInput.value;

    popupClose(idPopup);

    nameInput.value = '';
    jobInput.value = '';
};

function galleryFormSubmitHandler(evt) {
    evt.preventDefault();
    const title = placeInput.value;
    const image = imageInput.value;
    renderCard(createCard(title, image));
    popupClose(galleryPopup)
    placeInput.value = '';
    imageInput.value = '';
}

// ОБРАБОТЧИКИ

popupOpenButton.addEventListener('click', popupIdRender);
popupCloseButton.addEventListener('click', () => popupClose(idPopup));
formElement.addEventListener('submit', idFormSubmitHandler);
formElementGallery.addEventListener('submit', galleryFormSubmitHandler);
galleryEdit.addEventListener('click', () => popupOpen(galleryPopup));
galleryPopupCloseButton.addEventListener('click', () => popupClose(galleryPopup));