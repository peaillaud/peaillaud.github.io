// Initialisation des variables

var root = document.documentElement;
var divicon = document.getElementById('themeBtn');
var iconClasses = document.getElementsByClassName('iconeThemeBtn')[0];
var logo = document.getElementById('logo');
var boutonHaut = document.querySelector("#retournerHaut");

var webp = document.location.pathname
var webpage = webp.split('/')
var page = webpage.pop()

/**
 * Changement du thème du site à l'appel de la fonction, qui prend effet en cliquant sur l'icône de changement.
 */

divicon.onclick = function() {
    let icon = iconClasses.classList[1];
    let moonOrSun;
    let inverse;
    if (icon === 'sun') {
        // Changement de la valeur des variables et du style CSS (mode clair)

        root.style.setProperty('--bg-color', '#fff');
        root.style.setProperty('--bg-variant', "#ededed");
        root.style.setProperty('--font-title', '#444');
        root.style.setProperty('--font-paragraph', "#4e4e4e");
        root.style.setProperty('--button-color', '#D65A31');
        root.style.colorScheme = 'light'; // Non supporté sur Firefox...
        logo.style.filter = 'invert(0)';
        logo.style.transition = ".5s";

        if (page === "international.html") {
            document.querySelector("body > div.principal > section > div > div.container > img").style.filter = 'invert(0)';
            document.querySelector("body > div.principal > section > div > div.container > img").style.transition = ".5s";
        }

        // Changement de la valeur des variables JS (mode clair)
        moonOrSun = "moon";
        inverse = "sun";

    } else if (icon === 'moon') {

        // Changement de la valeur des variables et du style CSS (mode sombre)
        root.style.setProperty('--bg-color', '#222831');
        root.style.setProperty('--bg-variant', '#393e46');
        root.style.setProperty('--font-title', '#eee');
        root.style.setProperty('--font-paragraph', "#cecece");
        root.style.setProperty('--button-color', '#D65A31');
        root.style.colorScheme = 'dark';
        logo.style.filter = 'invert(1)';
        logo.style.transition = ".5s";

        if (page === "international.html") {
            document.querySelector("body > div.principal > section > div > div.container > img").style.filter = 'invert(1)';
            document.querySelector("body > div.principal > section > div > div.container > img").style.transition = ".5s";

        }
        moonOrSun = "sun";
        inverse = "moon";
    }

    iconClasses.classList.remove(inverse);
    iconClasses.classList.add(moonOrSun);
    iconClasses.src = `./images/${moonOrSun}.svg`
    console.log({ inverse, moonOrSun })
}

/**
 * Détecte lorsque l'utilisateur descend à un certain niveau de la page
 */

function descendre() {
    if (document.documentElement.scrollTop > 750 || document.body.scrollTop > 750) {
        boutonHaut.style.opacity = '1';
        boutonHaut.disabled = false;
        boutonHaut.style.cursor = 'pointer';
        boutonHaut.setAttribute('title', 'Retourner au début');
    } else {
        boutonHaut.style.opacity = '0';
        boutonHaut.disabled = true;
        boutonHaut.style.cursor = 'initial';
        boutonHaut.removeAttribute('title');
    }
}

/**
 * Renvoie l'utilisateur vers le haut de la page à l'appel de la fonction (par le bouton)
 */

function retourHaut() {
    document.body.scrollTop = 0; // Pour Chrome
    document.documentElement.scrollTop = 0; // Pour le reste
}

window.onscroll = function() {
    var scroll = document.body.scrollTop || document.documentElement.scrollTop;
    var hauteur = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var descendu = (scroll / hauteur) * 100; // Avoir un pourcentage de ce qu'a descendu l'utilisateur
    document.getElementsByClassName('indicateurScroll')[0].style.width = descendu + "%";
    // Pour éviter les erreurs
    if (document.body.contains(boutonHaut)) {
        descendre()
    }
}