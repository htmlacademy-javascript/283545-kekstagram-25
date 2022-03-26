import {getSimilarPhoto, SIMILAR_PHOTO_COUNT} from './data.js';
import {showSmallPictures} from './thumbnails.js';

const photosData = getSimilarPhoto(SIMILAR_PHOTO_COUNT);
showSmallPictures(photosData);
