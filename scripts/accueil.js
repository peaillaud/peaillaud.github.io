var button = document.querySelector('body > div.accueil > div.autoScroll');
var suiteSite = document.getElementsByClassName('suiteSite')[0];
var donneeY = suiteSite.getBoundingClientRect().top + window.pageYOffset;
var quotes = document.querySelectorAll('.quote');

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

/**
 * 
 * @param {float} valeur Valeur en vh qui va être convertie en px
 * @returns {float} Retourne la valeur en px
 */

function vhPx(valeur) {
    var y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    var result = (y * valeur) / 100;
    return result;
}

window.onscroll = function() {
    verifBouton();
}

button.onclick = function() {
    window.scrollTo({
        top: donneeY - vhPx(15)
    })
}