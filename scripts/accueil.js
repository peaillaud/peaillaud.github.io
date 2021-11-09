var button = document.querySelector('body > div.accueil > div.autoScroll');
var suiteSite = document.getElementsByClassName('suiteSite')[0];
var donneeY = suiteSite.getBoundingClientRect().top + window.pageYOffset;

/**
 * Gère l'afffichage du bouton de bienvenue en fonction de ce qu'a descendu l'utilisateur sur la page    
 */
function verifBouton() {
    if (getComputedStyle(button).opacity == '1' && document.documentElement.scrollTop > 80) {
        button.style.opacity = '0';
    } else if (getComputedStyle(button).opacity == '0' && document.documentElement.scrollTop == 0) {
        button.style.opacity = '1';
    }
}

// Convertir les VH en PX pour compenser la taille du header lors du scroll

function vhPx(valeur) {
    var y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    var result = (y * valeur) / 100;
    return result;
}


window.onscroll = verifBouton;
button.onclick = function() {
    window.scrollTo({
        top: donneeY - vhPx(10)
    })
}