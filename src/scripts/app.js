
const slider = require('./common/slider');
const map = require('./common/initMap');
const preloader = require('./common/preloader');
const hamburger = require('./common/hamburger');
const authorize = require('./common/authorize');

slider(); /* иницииализируем слайдер */
console.log('slider подключен');

map(); /* инициализируем стилизацию карты */
console.log('карта подключена');

preloader(); /* инициализация прелоадера */
console.log('прелоадер активирован');

hamburger(); /* инициализация hamburger */
console.log('hamburger активирован');

authorize(); /* инициализируем скрипта авторизации */
console.log('авторизация подключена');


