import {getSimilarPhotos} from './data.js';
import {showSmallPictures} from './thumbnails.js';

const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;
const photosData = getSimilarPhotos(SIMILAR_PHOTO_DESCRIPTION_COUNT);
//showSmallPictures(photosData);
