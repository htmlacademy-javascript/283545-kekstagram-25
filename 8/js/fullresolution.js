import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');

const getFullsizeModal = (url, likes, comments, description) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  socialCaption.textContent = description;

  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, message, name }) => {
    const socialCommentsItem = document.createElement('li');

    socialCommentsItem.classList.add('social__comment');

    const socialCommentsImage = document.createElement('img');

    socialCommentsImage.classList.add('social__picture');
    socialCommentsImage.src = avatar;
    socialCommentsImage.alt = name;

    socialCommentsItem.appendChild(socialCommentsImage);

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = message;

    socialCommentsItem.appendChild(socialText);

    commentsFragment.appendChild(socialCommentsItem);
  });
  //Добавить фрагмент комментариев в нужное место попапа
  //Удалить старые комментарии
  //Показывать только 5 комментариев
  openUserModal();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

/**
 * Хендлер по нажатию на крестик
 * @param {Object} evt - обьект события
 */
const onClosedButtonClick = (evt) => {
  evt.preventDefault();
  closeUserModal();
};

/**
 * Открывает модальное окно
 */
function openUserModal() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', onClosedButtonClick);
}

/**
 * Закрытие модального окна
 */
function closeUserModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButton.removeEventListener('click', onClosedButtonClick);
}

export { getFullsizeModal};
