module.exports = preloader => {
    document.body.onload = function(){

        setTimeout(function(){
            console.log('skill');
        }, 1000);
    };
};