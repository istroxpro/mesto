export const initialCards = [{
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

export const popupList = document.querySelectorAll('.popup');
export const idPopup = document.querySelector('.popup_profile');
export const galleryPopup = document.querySelector('.popup_gallery');
export const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close_gallery');
export const popupOpenButton = document.querySelector('.profile__edit-button');
export const popupCloseButton = document.querySelector('.popup__close');
export const formElement = document.querySelector('.popup__form');
export const formElementGallery = document.querySelector('.popup__form_gallery');
export const nameInput = document.querySelector('.popup__input_profile_name');
export const jobInput = document.querySelector('.popup__input_profile_description');
export const yourName = document.querySelector('.profile__title');
export const description = document.querySelector('.profile__subtitle');
export const card = document.querySelector('.cards');
export const cardTitle = document.querySelector('.cards__title');
export const galleryEdit = document.querySelector('.profile__add-button');
export const placeInput = document.querySelector('.popup__input_gallery_name');
export const imageInput = document.querySelector('.popup__input_gallery_url');
export const imagePopup = document.querySelector('.popup_view');
export const imageExpand = document.querySelectorAll('.cards__image');
export const imageCloseButton = imagePopup.querySelector('.popup__close_image');
export const imageView = document.querySelector('.popup__imgs');
export const imageText = document.querySelector('.popup__title_image');
export const submitButton = galleryPopup.querySelector('.popup__submit-button');