import {getSimilarPhotos, SIMILAR_PHOTO_COUNT} from './data.js';
import {showSmallPictures} from './thumbnails.js';

const photosData = getSimilarPhotos(SIMILAR_PHOTO_COUNT);
showSmallPictures(photosData);
