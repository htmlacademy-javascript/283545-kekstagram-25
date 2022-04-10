import {showSmallPictures} from './thumbnails.js';
import {activateValidationForm} from './editor-form.js';
import {getData} from './api.js';

const cb = (similarPhotos) => {
  showSmallPictures(similarPhotos);
};

getData(cb);

activateValidationForm();
