// Выбор случайного числа
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Проверка строки
const inspectString = (string, maxWidth = 140) => string.length < maxWidth;
