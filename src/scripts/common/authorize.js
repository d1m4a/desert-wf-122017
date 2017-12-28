function auth () {

    const btnAuth = document.getElementById('auth-btn');
    const containerFlip = document.getElementById('flip');
    console.log(btnAuth);
    console.log(containerFlip);
    btnAuth.addEventListener( "click", function(e) {
        e.preventDefault();
        containerFlip.classList.add('author-card__cards--open');
        this.classList.add('hidden');
    });
}

auth();

module.exports = authorize;