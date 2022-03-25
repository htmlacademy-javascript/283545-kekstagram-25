import {getFullsizeModal} from './fullsize-modal.js';

const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');

const showSmallPictures = (similarPictures) => {
  similarPictures.forEach(({url, likes, comments}) => {
    const similarPicture =  newPictureTemplate.cloneNode(true);
    similarPicture.querySelector('.picture__img').src = url;
    similarPicture.querySelector('.picture__likes').textContent = likes;
    similarPicture.querySelector('.picture__comments').textContent = comments.length;

    similarPicture.addEventListener('click', () => {
      getFullsizeModal(url, likes, comments);
    });

    fragment.appendChild(similarPicture);
  });

  picturesList.appendChild(fragment);
};

export {showSmallPictures};
