import {isEscapeKey} from './utils.js';

const SHOWN_COMMENT_COUNT = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');

const getFullsizeModal = (url, likes, comments, description) => {
  const commentsLength = comments.length;
  let commentsCounter = SHOWN_COMMENT_COUNT;

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  const showCommentsCount = () => {
    socialCommentCount.textContent = `${(commentsLength >= commentsCounter) ? commentsCounter : commentsLength} из ${commentsLength} комментариев`;
  };

  const updateCommentsCounterValue = () => {
    const commentsRemainder = commentsLength - commentsCounter;
    commentsCounter = commentsCounter + (commentsRemainder >= SHOWN_COMMENT_COUNT) ? SHOWN_COMMENT_COUNT : commentsRemainder;
  };

  const showCommentsLoader = () => {
    if (commentsLength <= commentsCounter) {
      socialCommentsLoader.classList.add('hidden');
    } else {
      socialCommentsLoader.classList.remove('hidden');
    }
  };

  showCommentsCount ();
  showCommentsLoader ();

  const fragmentWithComments = createFragmentWithComments(comments);

  socialCommentsList.innerHTML = '';
  socialCommentsList.appendChild(fragmentWithComments);
  const socialComments = socialCommentsList.querySelectorAll('.social__comment');

  const setCommentsVisibility = () => {
    for (let i = 0; i < commentsLength; i++) {
      if (i > commentsCounter - 1) {
        socialComments[i].classList.add('hidden');
      } else {
        socialComments[i].classList.remove('hidden');
      }
    }
  };

  setCommentsVisibility(commentsLength, commentsCounter, socialComments);
  openUserModal();

  socialCommentsLoader.addEventListener('click', () => loadComments(updateCommentsCounterValue, showCommentsCount, showCommentsLoader, setCommentsVisibility));
};

function createFragmentWithComments (comments) {

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
  //Показывать только 5 комментариев
  return commentsFragment;
}

function loadComments (updateCommentsCounterValue, showCommentsCount, showCommentsLoader, setCommentsVisibility) {
  updateCommentsCounterValue();
  showCommentsCount ();
  showCommentsLoader ();
  setCommentsVisibility();
}

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

export { getFullsizeModal, body};
