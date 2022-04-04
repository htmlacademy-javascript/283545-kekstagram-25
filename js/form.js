import { isEscapeKey } from './utils.js';
import { body } from './fullresolution.js';
import { activateEffects, deactivateEffects } from './effects.js';

const imagePicturePreview = document.querySelector('.img-upload__preview img');
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const closeButtonUploadForm = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP_VALUE = 25;
const DEFAULT_VALUE = 100;

const activateValidationForm = () => {

  function lowerScale() {
    if (parseInt(scaleControlValue.value, 10) > MIN_SCALE_VALUE) {
      scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - SCALE_STEP_VALUE} %`;
      imagePicturePreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
    }
  }

  function increaseScale() {
    if (parseInt(scaleControlValue.value, 10) < MAX_SCALE_VALUE) {
      scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + SCALE_STEP_VALUE} %`;
      imagePicturePreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
    }
  }

  const onFormEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onFormCloseUpload();
    }
  };

  function onFormOpenUpload() {
    uploadForm.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onFormEscKeydown);
    scaleControlValue.value = `${DEFAULT_VALUE} %`;
    scaleControlSmaller.addEventListener('click', lowerScale);
    scaleControlBigger.addEventListener('click', increaseScale);

    activateEffects();
  }

  function onFormCloseUpload() {
    uploadForm.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onFormEscKeydown);
    scaleControlSmaller.removeEventListener('click', lowerScale);
    scaleControlBigger.removeEventListener('click', increaseScale);
    uploadFile.value = '';
    deactivateEffects();
  }

  uploadFile.addEventListener('change', onFormOpenUpload);

  closeButtonUploadForm.addEventListener('click', () => {
    onFormCloseUpload();
  });

  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'div',
    errorTextClass: 'text__error-text',
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  function validateHashtag(value) {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    const result = re.test(value);
    return result;
  }

  pristine.addValidator(
    hashtags,
    validateHashtag,
    'До 19 букв и цифр без пробелов и знаков после решетки'
  );
};

export { activateValidationForm };
