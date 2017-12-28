
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


module.exports = hamburger;