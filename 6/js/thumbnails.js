import { create } from 'browser-sync';
import {getSimilarPhotos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');

const similarPictures = getSimilarPhoto(SIMILAR_PHOTO_COUNT);

similarPictures.forEach(({url, likes, comments}) => {
  const similarPicture =  newPictureTemplate.cloneNode(true);
  similarPicture.querySelector('.picture__img').src = url;
  similarPicture.querySelector('.picture__likes').textContent = likes;
  similarPicture.querySelector('.picture__comments').textContent = comments.length;

  fragment.appendChild(similarPicture);
});

picturesList.appendChild(fragment);
