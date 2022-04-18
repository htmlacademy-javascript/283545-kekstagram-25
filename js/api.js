import {showAlert} from './utils.js';
import {openErrorMessage, openSuccessMessage} from './messages.js';

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
