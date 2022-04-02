const imagePicturePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const effectLevelValue= document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  applyEffect ();
});

function applyEffect () {
  if (imagePicturePreview.classList.contains('effects__preview--none')) {
    imagePicturePreview.style.filter = 'none';
  }

  else if (imagePicturePreview.classList.contains('effects__preview--chrome')) {
    imagePicturePreview.style.filter = `grayscale(${effectLevelValue.value})`;
  }

  else if (imagePicturePreview.classList.contains('effects__preview--sepia')) {
    imagePicturePreview.style.filter = `sepia(${effectLevelValue.value})`;
  }

  else if (imagePicturePreview.classList.contains('effects__preview--marvin')) {
    imagePicturePreview.style.filter = `invert(${effectLevelValue.value}%)`;
  }

  else if (imagePicturePreview.classList.contains('effects__preview--phobos')) {
    imagePicturePreview.style.filter = `blur(${effectLevelValue.value}px)`;
  }

  else if (imagePicturePreview.classList.contains('effects__preview--heat')) {
    imagePicturePreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
}

function onEffectSliderUpdate () {
  effectSlider.setAttribute('disabled', true);

  for (const effectsItem of effectsItems) {
    const effectsRadio = effectsItem.querySelector('.effects__radio');

    effectsRadio.addEventListener('click', () => {
      imagePicturePreview.className = '';
      imagePicturePreview.classList.add(`effects__preview--${effectsRadio.value}`);

      if (imagePicturePreview.className === 'effects__preview--chrome' || imagePicturePreview === 'effects__preview--sepia') {
        effectSlider.removeAttribute('disabled');
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
      }

      else if (imagePicturePreview.className === 'effects__preview--marvin') {
        effectSlider.removeAttribute('disabled');
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
      }

      else if (imagePicturePreview.className === 'effects__preview--phobos') {
        effectSlider.removeAttribute('disabled');
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }

      else if (imagePicturePreview.className === 'effects__preview--heat') {
        effectSlider.removeAttribute('disabled');
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }

      else if (imagePicturePreview.className === 'effects__preview--none') {
        effectSlider.setAttribute('disabled', true);
      }
    });
  }
}

onEffectSliderUpdate ();

export {imagePicturePreview};
