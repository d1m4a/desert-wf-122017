
const slider = require('./common/slider');
const map = require('./common/initMap');
const preloader = require('./common/preloader');
const hamburger = require('./common/hamburger');
const flip = require('./common/flip');
const skills = require('./common/skills');

slider(); /* иницииализируем слайдер */
console.log('slider подключен');

map(); /* инициализируем стилизацию карты */
console.log('карта подключена');

preloader(); /* инициализация прелоадера */
console.log('прелоадер активирован');

hamburger(); /* инициализация hamburger */
console.log('hamburger активирован');

flip(); /* инициализируем скрипта flip */
console.log('flip подключена');

skills(); /* инициализируем скрипта skills */
console.log('skills подключеы');

