module.exports = slider => {

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
};
//module.exports = sliderInit;