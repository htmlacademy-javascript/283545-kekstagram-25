const imagePicturePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const effectLevelValue= document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

const activateEffects = () => {
  initSlider();

  effectSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectSlider.noUiSlider.get();
    applyEffect ();
  });

  onEffectSliderUpdate ();

};

function initSlider () {
  if (!effectSlider.noUiSlider) {

    noUiSlider.create(effectSlider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    });
    effectSlider.setAttribute('disabled', true);
  }
}

function destroySlider () {
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
}

function deactivateEffects () {
  imagePicturePreview.style.transform = '';
  imagePicturePreview.style.filter = 'none';
  imagePicturePreview.className = 'effects__preview--none';

  destroySlider();
}


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

  for (const effectsItem of effectsItems) {
    const effectsRadio = effectsItem.querySelector('.effects__radio');

    effectLevel.classList.add('hidden');

    effectsRadio.addEventListener('click', () => {
      imagePicturePreview.className = '';
      imagePicturePreview.classList.add(`effects__preview--${effectsRadio.value}`);

      if (imagePicturePreview.className === 'effects__preview--chrome' || imagePicturePreview.className === 'effects__preview--sepia') {
        effectLevel.classList.remove('hidden');
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
        effectLevel.classList.remove('hidden');
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
        effectLevel.classList.remove('hidden');
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
        effectLevel.classList.remove('hidden');
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
        effectLevel.classList.add('hidden');
        effectSlider.setAttribute('disabled', true);
        imagePicturePreview.style.filter = 'none';
      }
    });
  }
}

export {activateEffects, deactivateEffects};
