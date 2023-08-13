const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let profile = document.querySelector('.profile')
let Elements = document.querySelector('.elements')
let editButton = profile.querySelector('.profile__edit-button')
let profileInfo = profile.querySelector('.profile__info')
let author = profileInfo.querySelector('.profile__author')
let profileName = author.querySelector('.profile__author-name')
let info = author.querySelector('.profile__author-info')
let popup = document.querySelector('.popup')
let popupTextName = popup.querySelector('.popup__text_form_name')
let popupInfo = popup.querySelector('.popup__text_form_info')
let formElement = popup.querySelector('.popup__fields')
let closeButton = popup.querySelector('.popup__close-button')
let addPopup = document.querySelector('#add-popup')
let addcloseButton = document.querySelector('#add-popup__close-button')
let addButton = profile.querySelector('.profile__button')
let elementsTemplate = document.querySelector('.elements__element-template').content
let FormAdd = addPopup.querySelector('#FormAdd')
let form = popup.querySelector('#popupForm')
let elementName = addPopup.querySelector('.popup__text_form_name')
let elementImg = addPopup.querySelector('.popup__text_form_img')
let newCardBtn = addPopup.querySelector('#add-popup__save-button')
let CloseBtnPopup = addPopup.querySelector('#add-popup__close-button')

let startCards = initialCards.map(({ name, link }) => createElement(name, link));
Elements.prepend(...startCards);

function popupOpen() {
  popupTextName.value = profileName.textContent;
  popupInfo.value = info.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened')
}

function addPopupOpen() {
  addPopup.classList.add('popup_opened');
}

function addPopupClose() {
  addPopup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupTextName.value;
  info.textContent = popupInfo.value;
  popupClose();
}

function renderElements(name, link) {
  Elements.prepend(createEl(name, link));
}

function addEl(evt) {
  evt.preventDefault();
  renderElements(elementName.value, elementImg.value);
  addPopupClose();
}

function reternEl(name, link) {
  let cardEl = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  cardEl.querySelector('.elements__pic').src = link;
  cardEl.querySelector('.elements__card-name').textContent = name;
  return cardEl;
}
// console.log(reternEl());

function createEl(name, link) {
  let cardEl = reternEl(name, link);
  return cardEl;
}

function createElement(name, link) {
  const cardEl = reternEl(name, link);

  const likeButton = cardEl.querySelector('.elements__card-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__card-button_active');
  });
  return cardEl;
}

editButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)
formElement.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', addPopupOpen);
addcloseButton.addEventListener('click', addPopupClose);
FormAdd.addEventListener('submit', addEl);

