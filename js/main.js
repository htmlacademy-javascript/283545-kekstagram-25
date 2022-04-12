import {showSmallPictures} from './thumbnails.js';
import {activateValidationForm} from './editor-form.js';
import {getData} from './api.js';
import {activateFilters} from './filters.js';

const cb = (similarPhotos) => {
  showSmallPictures(similarPhotos);
  activateFilters(similarPhotos);
};

getData(cb);

activateValidationForm();
