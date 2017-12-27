    
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