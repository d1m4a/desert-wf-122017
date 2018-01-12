module.exports = flip => {

    const btnAuth = document.getElementById('auth-btn');
    const containerFlip = document.getElementById('flip');
    const btnAuthBack = document.getElementById('btn-auth-back');

    btnAuth.addEventListener( "click", function(e) {
        e.preventDefault();
        containerFlip.classList.add('author-card__cards--open');
        this.classList.add('hidden');
    });
    btnAuthBack.addEventListener( "click", function(e) {
        e.preventDefault();
        containerFlip.classList.remove('author-card__cards--open');
        btnAuth.classList.remove('hidden');
    });
};