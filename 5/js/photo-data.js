// Константы
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
const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;
const idListPhotos = [];
const idListComments = [];
const urlList = [];

// Выбор елемента
const getRandomArrayElement = (elements) => return elements[getRandomIntInclusive(0, elements.length - 1)];

// Массив ключей

const generateId = (idCount) => {
  let randomID = getRandomIntInclusive(1, idCount);

  while (idListPhotos.includes(randomID)) {
    randomID = getRandomIntInclusive(1, idCount);
  }

  idListPhotos.push(randomID);

  return randomID;
};

const generateURL = (urlCount) => {
  let randomURL = getRandomIntInclusive(1, urlCount);

  while (urlList.includes(randomURL)) {
    randomURL = getRandomIntInclusive(1, urlCount);
  }

  urlList.push(randomURL);

  return randomURL;
};

const avatar = () => {
  const randomAvatar = getRandomIntInclusive(1, 6);
  return `img/avatar-${randomAvatar}.png`;
};

const generateRandomMessage = () => {

  let randomMessage = getRandomArrayElement(MESSAGES);

  while (idListComments.includes(randomMessage)) {
    randomMessage = getRandomArrayElement(MESSAGES);
  }

  idListComments.push(randomMessage);
  return ' ' + randomMessage;
};

const createRandomDoubleMessage = () => {
  const randomDoubleMessage = String(Array.from({length: getRandomIntInclusive(1, 2)}, generateRandomMessage));
  return randomDoubleMessage.trim();
};

function createComments() {
  return ({
    id: generateId(COMMENT_ID_COUNT),
    avatar: avatar(),
    message: createRandomDoubleMessage(),
    name: getRandomArrayElement(NAMES),
  });
}

function getSimilarComments() {
  const similarCommentsCount = getRandomIntInclusive(1, 3);
  return Array.from({length: similarCommentsCount}, createComments);
}

function createPhoto() {
  return {
    id: generateId(DESCRIPTION_ID_COUNT),
    url: generateURL(PHOTO_COUNT),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntInclusive(15, 200),
    comments: getSimilarComments(),
  };
}

function getSimilarPhoto(photosCount) {
  return Array.from({length: photosCount}, createPhoto);
}

const photosData = getSimilarPhoto(SIMILAR_PHOTO_DESCRIPTION_COUNT);

export {photosData};
