import {getSimilarPhoto, SIMILAR_PHOTO_COUNT} from './data.js';
import {showSmallPictures} from './thumbnails.js';
import {activateValidationForm} from './editor-form.js';

const photosData = getSimilarPhoto(SIMILAR_PHOTO_COUNT);
showSmallPictures(photosData);
activateValidationForm();
