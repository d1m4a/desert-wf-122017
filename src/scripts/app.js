const slider = require('./common/slider');
const map = require('./common/initMap');
const preloader = require('./common/preloader');
const gumburger = require('./common/gumburger');
//const $ = require('jquery');


slider(); /* иницииализируем слайдер */
console.log('slider подключен');

map(); /* инициализируем стилизацию карты */
console.log('карта подключена');

preloader(); /* инициализация прелоадера */
console.log('прелоадер активирован');

gumburger(); /* инициализация gumburger */
console.log('gumburger активирован');