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

const profile = document.querySelector(".profile");
const buttonAdd = profile.querySelector(".profile__button");
const buttonEditProfile = profile.querySelector(".profile__edit-button");
const authorInfo = profile.querySelector(".profile__info");
const author = authorInfo.querySelector(".profile__author");
const profileName = author.querySelector(".profile__author-name");
const info = author.querySelector(".profile__author-info");
const popupEditProfile = document.querySelector(".popup");
const buttonCloseEditProfile = popupEditProfile.querySelector(".popup__close-button");
const popupInfo = popupEditProfile.querySelector(".popup__text-info");
const elementForm = popupEditProfile.querySelector(".popup__fields");
const popupNameEditProfile = popupEditProfile.querySelector(".popup__text-name");
const popupAdd = document.querySelector("#add-popup");
const elementImg = popupAdd.querySelector(".popup__text-img");
const formAdd = popupAdd.querySelector("#addform");
const elementName = popupAdd.querySelector(".popup__text-name");
const newCardButton = popupAdd.querySelector("#add-popup__save-button");
const popupAddCloseButton = popupAdd.querySelector("#add-popup__close-button");
const elements = document.querySelector(".elements");
const elementsTemplate = document.querySelector(".elements__element-template").content
const imgPopup = document.querySelector("#img-popup");
const img = imgPopup.querySelector(".popup__image");
const imgPopupCloseButton = imgPopup.querySelector("#img-popup__close-button");
const imgName = imgPopup.querySelector(".popup__image-name");


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function EditFormProfile(evt) {
  evt.preventDefault();
  info.textContent = popupInfo.value;
  profileName.textContent = popupNameEditProfile.value;
  closePopup(popupEditProfile);
}
function editPopupOpen() {
  popupNameEditProfile.value = profileName.textContent;
  popupInfo.value = info.textContent;
  openPopup(popupEditProfile);
}

function addElement(evt) {
  evt.preventDefault();
  renderElements(elementName.value, elementImg.value);
  formAdd.reset();
  closePopup(popupAdd);
}

const renderElements = (name, link) => {
  elements.prepend(createElement(name, link));
}

function returnElement(name, link) {
  const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__card-name').textContent = name;
  cardElement.querySelector('.elements__pic').src = link;
  cardElement.querySelector('.elements__pic').alt = name;
  return cardElement;
}

function createElement(name, link) {
  const cardElement = returnElement(name, link);

  const likeButton = cardElement.querySelector('.elements__card-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__card-button_active');
  });

  cardElement.querySelector('.elements__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  cardElement.querySelector('.elements__pic').addEventListener('click', () => {
    imgName.textContent = name;
    img.src = link;
    img.alt = name;
    openPopup(imgPopup);
  });

  return cardElement;
}

popupEditProfile.querySelector('.popup__close-button').addEventListener('click', function () {
  closePopup(popupEditProfile);
});

document.querySelector('.profile__button').addEventListener('click', function () {
  openPopup(popupAdd);
});

popupAdd.querySelector('.popup__close-button').addEventListener('click', function () {
  closePopup(popupAdd);
});

imgPopup.querySelector('.popup__close-button').addEventListener('click', function () {
  closePopup(imgPopup);
});

const defaultCards = initialCards.map(function (card) {
  return createElement(card.name, card.link);
});
elements.prepend.apply(elements, defaultCards);

buttonEditProfile.addEventListener('click', editPopupOpen)
formAdd.addEventListener('submit', addElement);
elementForm.addEventListener('submit', EditFormProfile);
