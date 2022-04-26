'use strict'
// ПЕРЕМЕННЫЕ

const popup = document.querySelector('.popup');
const galleryPopup = document.querySelector('.popup_gallery');
const galleryPopupCloseBtn = galleryPopup.querySelector('.popup__close_gallery');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = popup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const formElementGallery = document.querySelector('.popup__form_gallery');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_description');
const yourName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');
const like = document.getElementsByClassName('cards__like-button');
const deleteButton = document.getElementsByClassName('cards__delete-button')
const cardsTemplate = document.querySelector('.cards__template').content;
const cards = document.querySelector('.cards');
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

initialCards.map(renderCards);

// ПЕРЕМЕННЫЕ ПРЕДПРОСМОТРА КАРТОЧЕК (сидят здесь, потому что до рендеринга не работают)

const imagePopup = document.querySelector('.popup_image');
const imageExpand = document.querySelectorAll('.cards__image');
const imageCloseButton = imagePopup.querySelector('.popup__close_image')


// ФУНКЦИИ

function renderCards(initialCards) {
    const cardsElem = cardsTemplate.querySelector('.cards__block').cloneNode(true);
    cardsElem.querySelector('.cards__image').src = initialCards.link;
    cardsElem.querySelector('.cards__image').alt = initialCards.alt;
    cardsElem.querySelector('.cards__title').textContent = initialCards.name;
    cards.append(cardsElem);
}

// ПОПАП ПРОФИЛЯ

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = yourName.textContent;
    jobInput.value = description.textContent;
};

function popupClose() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
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

function newCard(evt) {
    evt.preventDefault();
    const cardsElem = cardsTemplate.querySelector('.cards__block').cloneNode(true);
    cardsElem.querySelector('.cards__image').src = imageInput.value;
    cardsElem.querySelector('.cards__image').alt = placeInput.value;
    cardsElem.querySelector('.cards__image').addEventListener('click', imageView);
    cardsElem.querySelector('.cards__title').textContent = placeInput.value;
    cardsElem.querySelector('.cards__like-button').addEventListener('click', likeIt)
    cardsElem.querySelector('.cards__delete-button').addEventListener('click', cardRemove);
    cards.prepend(cardsElem);

    closeGallery();
};

// ФУНКЦИЯ ЛАЙКА

function likeIt() {
    if (this.classList.contains('cards__like-button_active')) {
        this.classList.remove('cards__like-button_active')
    } else {
        this.classList.add('cards__like-button_active')
    };
};

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ

function cardRemove(evt) {
    evt.target.closest('.cards__block').remove()
}

// ФУНКЦИИ ПРЕДПРОСМОТРА КАРТОЧКИ

function imageView(evt) {
    imagePopup.classList.toggle('popup_opened')
    const imageView = document.querySelector('.popup_image_img')
    imageView.src = evt.target.src;
    const imageText = document.querySelector('.popup__title_image')
    imageText.textContent = evt.target.alt;
}

// ОБРАБОТЧИКИ

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
formElementGallery.addEventListener('submit', newCard);
galleryEdit.addEventListener('click', editGallery);
galleryPopupCloseBtn.addEventListener('click', closeGallery);
for (let i = 0; i < like.length; i++) {
    like[i].addEventListener('click', likeIt);
};
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', cardRemove);
};
imageExpand.forEach(function (element) {
    element.addEventListener('click', imageView);
});
imageCloseButton.addEventListener('click', imageView);