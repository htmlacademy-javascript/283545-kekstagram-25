import {showAlert, isEscapeKey} from './util.js';

const body = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');
const successUnit = templateSuccess.cloneNode(true);
const successButton = successUnit.querySelector('.success__button');
const errorUnit = templateError.cloneNode(true);
const errorButton = errorUnit.querySelector('.error__button');

const onSuccessMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successUnit.classList.add('hidden');
  }
};

const onErrorMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorUnit.classList.add('hidden');
  }
};

const createSuccessMessage = () => {
  body.appendChild(successUnit);
  successUnit.classList.add('hidden');
};

const createErrorMessage = () => {
  body.appendChild(errorUnit);
  errorUnit.classList.add('hidden');
};

createSuccessMessage();
createErrorMessage();

function openSuccessMessage () {
  successUnit.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageEscKeyDown);

  successButton.addEventListener('click', () => {
    closeSuccessMessage ();
  });

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.contains(successUnit)) {
      successUnit.classList.add('hidden');
    }
  });
}

function closeSuccessMessage () {
  successUnit.classList.add('hidden');

  document.removeEventListener('keydown', onSuccessMessageEscKeyDown);

  successButton.removeEventListener('click', () => {
    closeSuccessMessage ();
  });
}

function openErrorMessage () {
  errorUnit.classList.remove('hidden');
  document.addEventListener('keydown', onErrorMessageEscKeyDown);

  errorButton.addEventListener('click', () => {
    closeErrorMessage ();
  });

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.contains(errorUnit)) {
      errorUnit.classList.add('hidden');
    }
  });
}

function closeErrorMessage () {
  errorUnit.classList.add('hidden');
  document.removeEventListener('keydown', onErrorMessageEscKeyDown);
  errorButton.removeEventListener('click', () => {
    closeErrorMessage ();
  });
}

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((similarPhotos) => {
      if (similarPhotos.length) {
        onSuccess(similarPhotos);
      } else {
        showAlert('Ошибка загрузки данных');
      }
    })
    .catch(() => {
      showAlert('Ошибка загрузки изображений');
    });
};

const sendData = (onSuccess, onFail, FormData) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      type: 'multipart/form-data',
      body: FormData,
    },
  )

    .then((response) => {
      if (response.ok) {
        onSuccess(openSuccessMessage());
      } else {
        onFail(openErrorMessage());
      }
    })
    .catch(() => {
      onFail(openErrorMessage());
    });
};

export {getData, sendData};
