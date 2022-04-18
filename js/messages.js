import {isEscapeKey} from './utils.js';
import {hashtags, textDescription} from './editor-form.js';

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

const closeSuccessMessage = () => {
  successUnit.classList.add('hidden');

  document.removeEventListener('keydown', onSuccessMessageEscKeyDown);

  successButton.removeEventListener('click', () => {
    closeSuccessMessage ();
  });
};

const openSuccessMessage = () => {
  successUnit.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageEscKeyDown);
  hashtags.value = '';
  textDescription.value = '';

  successButton.addEventListener('click', () => {
    closeSuccessMessage ();
  });

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.contains(successUnit)) {
      successUnit.classList.add('hidden');
    }
  });
};

const closeErrorMessage = () => {
  errorUnit.classList.add('hidden');
  document.removeEventListener('keydown', onErrorMessageEscKeyDown);
  errorButton.removeEventListener('click', () => {
    closeErrorMessage ();
  });
};

const openErrorMessage = () => {
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
};

export{openErrorMessage, openSuccessMessage};
