'use strict'
// ПЕРЕМЕННЫЕ

const IdPopup = document.querySelector('.popup');
const galleryPopup = document.querySelector('.popup_gallery');
const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close_gallery');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = IdPopup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const formElementGallery = document.querySelector('.popup__form_gallery');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_description');
const yourName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');
const like = document.getElementsByClassName('cards__like-button');
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



// ПЕРЕМЕННЫЕ ПРЕДПРОСМОТРА КАРТОЧЕК (сидят здесь, потому что до рендеринга не работают)

const imagePopup = document.querySelector('.popup_view');
const imageExpand = document.querySelectorAll('.cards__image');
const imageCloseButton = imagePopup.querySelector('.popup__close_image');
const imageView = document.querySelector('.popup__imgs');
const imageText = document.querySelector('.popup__title_image');


// ФУНКЦИИ

function renderCards(card) {
    const cardsElem = cardsTemplate.querySelector('.cards__block').cloneNode(true);
    cardsElem.querySelector('.cards__image').src = card.link;
    cardsElem.querySelector('.cards__image').alt = card.alt;
    cardsElem.querySelector('.cards__title').textContent = card.name;
    cardsElem.querySelector('.cards__like-button').addEventListener('click', likeIt);
    cardsElem.querySelector('.cards__delete-button').addEventListener('click', cardRemove);
    cardsElem.querySelector('.cards__image').addEventListener('click', imagePreview);
    imageCloseButton.addEventListener('click', imagePreview);
    renderCard(cardsElem);
};

initialCards.map(renderCards);
// ПОПАП ПРОФИЛЯ

function textCapture() {
    nameInput.value = yourName.textContent;
    jobInput.value = description.textContent;
};

function popupOpen() {
    IdPopup.classList.add('popup_opened');
    textCapture();
};

function popupClose() {
    IdPopup.classList.remove('popup_opened');
};

function IdFormSubmitHandler(evt) {
    evt.preventDefault();
    yourName.textContent = nameInput.value;
    description.textContent = jobInput.value;

    popupClose();
};

// ПОПАП ГАЛЕРЕИ

function editGallery() {
    galleryPopup.classList.add('popup_opened');
}

function closeGallery() {
    galleryPopup.classList.remove('popup_opened');
}

function addCard(evt) {
    evt.preventDefault();
    const cardsElem = cardsTemplate.querySelector('.cards__block').cloneNode(true);
    const cardImage = cardsElem.querySelector('.cards__image');
    cardImage.src = imageInput.value;
    cardImage.alt = placeInput.value;
    cardImage.addEventListener('click', imagePreview);
    cardsElem.querySelector('.cards__title').textContent = placeInput.value;
    cardsElem.querySelector('.cards__like-button').addEventListener('click', likeIt)
    cardsElem.querySelector('.cards__delete-button').addEventListener('click', cardRemove);
    renderCard(cardsElem);

    closeGallery();
};

function renderCard(element) {
    card.prepend(element);
};

// ФУНКЦИЯ ЛАЙКА

function likeIt() {
    this.classList.toggle('cards__like-button_active')
};

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ

function cardRemove(evt) {
    evt.target.closest('.cards__block').remove()
}

// ФУНКЦИИ ПРЕДПРОСМОТРА КАРТОЧКИ

function imagePreview(evt) {
    imagePopup.classList.toggle('popup_opened')
    imageView.src = evt.target.src;
    imageText.textContent = evt.target.alt;
}

// ОБРАБОТЧИКИ

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', IdFormSubmitHandler);
formElementGallery.addEventListener('submit', addCard);
galleryEdit.addEventListener('click', editGallery);
galleryPopupCloseButton.addEventListener('click', closeGallery);