let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button')
let profileInfo = profile.querySelector('.profile__info')
let author = profileInfo.querySelector('.profile__author')
let profileName = author.querySelector('.profile__author-name')
let info = author.querySelector('.profile__author-info')
let popup = document.querySelector('.popup')
let popupTextName = popup.querySelector('.popup__text_name')
let popupInfo = popup.querySelector('.popup__text_info')
let formElement = popup.querySelector('.popup__fields')
let closeButton = popup.querySelector('.popup__close-button')


function popupOpen() {
  popupTextName.value = profileName.textContent;
  popupInfo.value = info.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupTextName.value;
  info.textContent = popupInfo.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)
formElement.addEventListener('submit', handleFormSubmit);

