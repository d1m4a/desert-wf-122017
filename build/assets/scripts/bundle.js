/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const slider = __webpack_require__(1);
const map = __webpack_require__(2);
const preloader = __webpack_require__(3);
const gumburger = __webpack_require__(4);
const auth = __webpack_require__(5);
//const $ = require('jquery');

auth(); /* инициализируем скрипта авторизации */
console.log('авторизация подключена');

slider(); /* иницииализируем слайдер */
console.log('slider подключен');

map(); /* инициализируем стилизацию карты */
console.log('карта подключена');

preloader(); /* инициализация прелоадера */
console.log('прелоадер активирован');

gumburger(); /* инициализация gumburger */
console.log('gumburger активирован');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

const slides = document.querySelectorAll('#slides .slide'); /* кол-во слайдов */
const next = document.getElementById('next'); /* кнопочка следующий слайд */
const previous = document.getElementById('previous'); /* кнопочка предыдущий слайд */
const controls = document.querySelectorAll('.controls'); /* кнопочки контроля за листанием слайдов */

console.log();

let currentSlide = 0;

/* осуществляет переход к слайду номер n (начиная с 0) */
function goToSlide(n){
    slides[currentSlide].className = 'slide'; /* беретcя n-ный слайд с классом slide */
    currentSlide = (n+slides.length)%slides.length; /* остаток от деления */
    slides[currentSlide].className = 'slide showing'; /* присваеваем этому слайду класс Showing т.е. показываем его */
}

/* навешиваем обработкчики событий на элементы next и previous */
function setupListners(){
    next.onclick = function(){
        goToSlide(currentSlide+1);
        console.log('клик след');
    }
    previous.onclick = function(){
        goToSlide(currentSlide-1);
        console.log('клик пред');
    }
}

/* показываем кнопочки для навигации (в случае если js не загрузится клиент не увидит кнопок, а только картинки) */
function showButtons(){
    for(var i=0; i<controls.length; i++){
        controls[i].style.display = 'inline-block';
    }
}

/* инициализация слайдера */
function sliderInit(){
    if(slides.length !== 0) { /* на странице есть нужный html код */
        setupListners();
        showButtons();
    }
}

module.exports = sliderInit;

/***/ }),
/* 2 */
/***/ (function(module, exports) {


function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {

		center: {lat: 56.026876, lng: 92.865734},

		zoom: 12,

		styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#ff9900"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
	});
}
//window.initMap = initMap;
module.exports = initMap;

/***/ }),
/* 3 */
/***/ (function(module, exports) {


    document.body.onload = function(){

        setTimeout(function(){
            var preloader = document.getElementById("preloader");
                if (!preloader.classList.contains('done')){
                    preloader.classList.add('done');
                }
        }, 1000);
    };


module.exports = preloader;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function() {

    const toggles = document.querySelectorAll(".menu__toggle");
    const container = document.querySelector('.menu__container');
    const menu = document.querySelector('.menu__list');

   
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };
   
    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        if(this.classList.contains("active") === true) { 
          this.classList.remove("active")
          container.classList.remove('menu__container--open')
          menu.classList.remove('menu__list--open')
        } else { 
          this.classList.add("active");
          container.classList.add('menu__container--open')
          menu.classList.add('menu__list--open')
        }
      });
    }
   
  })();

module.exports = gumburger;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

    
    const btnAuth = document.getElementById("authBtn");
    const containerAuth = document.querySelector('.author-card__cards');

    console.log(document.getElementById("authBtn"));

    btnAuth.addEventListener( "click", function(e) {
        e.preventDefault();
        console.log('клик');

        containerAuth.classList.add('author-card__cards--open'); // перевернули на другую сторону
        this.style.display = 'none'; // скрыли кнопку
    });

module.exports = auth;

/***/ })
/******/ ]);