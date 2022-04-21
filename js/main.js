import {showSmallPictures} from './thumbnails.js';
import {activateValidationForm} from './editor-form.js';
import {getData} from './api.js';
import {activateFilters} from './filters.js';

const showPhotosAndActivateFilters = (similarPhotos) => {
  showSmallPictures(similarPhotos);
  activateFilters(similarPhotos);
};

getData(showPhotosAndActivateFilters);

activateValidationForm();
