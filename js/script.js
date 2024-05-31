document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
        document.title = "🛍️ Volte para suas compras";
    }
    else {
        document.title = "Venus Cosméticos";
    }
});


function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../Assets/menu.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../Assets/close.png";
    }
}