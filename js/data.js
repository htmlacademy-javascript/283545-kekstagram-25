import {getRandomIntInclusive, getRandomArrayElement} from './utils.js';

const DESCRIPTIONS = [
  'Моя ласточка',
  'Красивый закат',
  'Гуляем с хорошим мальчиком',
  'Ура! Наконец-то весна после долгой зимы',
  'Разве это не прекрасно...',
  'Наша семья',
];

const NAMES = [
  'Александр',
  'Хуан Карлос',
  'Мария',
  'Федор',
  'Виктор',
  'Юлия',
  'Анна',
  'Эрих Мария',
  'Антон Санчес джуниор'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION_ID_COUNT = 25;
const PHOTO_COUNT = 25;
const COMMENT_ID_COUNT = 100000000;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const SIMILAR_PHOTO_COUNT = 25;
const idListPhotos = [];
const idListComments = [];
const urlList = [];

const getRandomIdPhotos = (idCount) => {
  let randomIdPhotos = getRandomIntInclusive(1, idCount);

  while (idListPhotos.includes(randomIdPhotos)) {
    randomIdPhotos = getRandomIntInclusive(1, idCount);
  }

  idListPhotos.push(randomIdPhotos);

  return randomIdPhotos;
};

const getRandomIdComments = (idCount) => {
  let randomIdComments = getRandomIntInclusive(1, idCount);

  while (idListComments.includes(randomIdComments)) {
    randomIdComments = getRandomIntInclusive(1, idCount);
  }

  idListComments.push(randomIdComments);

  return randomIdComments;
};

const getRandomUrl = (urlCount) => {
  let randomUrl = getRandomIntInclusive(1, urlCount);

  while (urlList.includes(randomUrl)) {
    randomUrl = getRandomIntInclusive(1, urlCount);
  }

  urlList.push(randomUrl);

  return `photos/${randomUrl}.jpg`;
};

const getRandomAvatar = () => {
  const RANDOM_AVATAR_NUMBER = getRandomIntInclusive(1, 6);
  return `img/avatar-${RANDOM_AVATAR_NUMBER}.svg`;
};

const createRandomDoubleMessage = () => {
  const messageList = [];
  const createRandomMessage = () => {

    for (let i = 0; i <= MESSAGES.length -1; i++) {

      let randomMessage = getRandomArrayElement(MESSAGES);

      while (messageList.includes(randomMessage)) {
        randomMessage = getRandomArrayElement(MESSAGES);
      }

      messageList.push(randomMessage);
      return ` ${  randomMessage}`;
    }
  };
  const RANDOM_DOUBLE_MESSAGE = String(Array.from({length: getRandomIntInclusive(1, 2)}, createRandomMessage));
  return RANDOM_DOUBLE_MESSAGE.trim();
};

function createComments() {
  return ({
    id: getRandomIdComments(COMMENT_ID_COUNT),
    avatar: getRandomAvatar(),
    message: createRandomDoubleMessage(),
    name: getRandomArrayElement(NAMES),
  });
}

function getSimilarComments() {
  const SIMILAR_COMMENTS_COUNT = getRandomIntInclusive(1, 3);
  return Array.from({length: SIMILAR_COMMENTS_COUNT}, createComments);
}

function createPhoto() {
  return {
    id: getRandomIdPhotos(DESCRIPTION_ID_COUNT),
    url: getRandomUrl(PHOTO_COUNT),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntInclusive(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: getSimilarComments(),
  };
}

function getSimilarPhoto(photosCount) {
  return Array.from({length: photosCount}, createPhoto);
}

export {getSimilarPhoto, SIMILAR_PHOTO_COUNT};
