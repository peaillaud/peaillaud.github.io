var button = document.querySelector('body > div.accueil > div.autoScroll');
var suiteSite = document.getElementsByClassName('suiteSite')[0];
var donneeY = suiteSite.getBoundingClientRect().top + window.pageYOffset;

button.onclick = function() {
    window.scrollTo({ top: donneeY - 65 })
}

/**
 * Gère l'afffichage du bouton en fonction de ce qu'a descendu l'utilisateur sur la page    
 */
function verifBouton() {
    if (getComputedStyle(button).opacity == '1' && document.documentElement.scrollTop > 80) {
        button.style.opacity = '0';
    } else if (getComputedStyle(button).opacity == '0' && document.documentElement.scrollTop == 0) {
        button.style.opacity = '1';
    }
}

window.onscroll = verifBouton;