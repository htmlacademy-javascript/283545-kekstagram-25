import {debounce} from './utils.js';
import {getRandomArrayElement} from './utils.js';
import {showSmallPictures} from './thumbnails.js';

const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');
const defaultFilter = filters.querySelector('#filter-default');

const getRandomImages = (similarPhotos) => {
  const randomImagesList = [];

  for (let i = 0; i < 10; i++) {
    let random = getRandomArrayElement(similarPhotos);

    if (randomImagesList.includes(random)) {
      random = getRandomArrayElement(similarPhotos);
    }

    randomImagesList.push(random);
  }
  return randomImagesList;
};

const getDiscussedImages = (similarPhotos) => similarPhotos.slice().sort((a, b) => b.comments.length - a.comments.length);

const activateFilters = (similarPhotos) => {
  filters.classList.remove('img-filters--inactive');

  randomFilter.addEventListener('click', debounce(() => {
    randomFilter.classList.add('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');

    const randomPhotos = getRandomImages(similarPhotos);

    showSmallPictures(randomPhotos);
  }, RERENDER_DELAY));

  discussedFilter.addEventListener('click', debounce(() => {
    discussedFilter.classList.add('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');

    const discussedPhotos = getDiscussedImages(similarPhotos);

    showSmallPictures(discussedPhotos);
  }, RERENDER_DELAY));

  defaultFilter.addEventListener('click', debounce(() => {
    defaultFilter.classList.add('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');

    showSmallPictures(similarPhotos);
  }, RERENDER_DELAY));
};

export {activateFilters};
