import * as data from "./variables.js";
import {
    openPopup
} from "./index.js";
export class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    };

    _getTemplate() {
        const cardsTemplate = document.querySelector(this._cardSelector);
        const cardsElem = cardsTemplate.content.cloneNode(true);
        const cardTitle = cardsElem.querySelector('.cards__title');
        const cardImage = cardsElem.querySelector('.cards__image');
        cardImage.src = this._image;
        cardImage.alt = this._title;
        cardTitle.textContent = this._title;

        return cardsElem;
    };

    _imagePreview() {
        openPopup(data.imagePopup);
        data.imageView.src = this._image;
        data.imageView.alt = this._title;
        data.imageText.textContent = this._title;
    };

    _setEventListeners() {
        const likeButton = this._element.querySelector('.cards__like-button');
        const deleteButton = this._element.querySelector('.cards__delete-button');
        const img = this._element.querySelector('.cards__image')
        img.addEventListener('click', () => {
            this._imagePreview()
        });
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('cards__like-button_active')
        });
        deleteButton.addEventListener('click', () => {
            deleteButton.closest('.cards__block').remove()
        });
    };

    renderCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        return this._element;
    };
};