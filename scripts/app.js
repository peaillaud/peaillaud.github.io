// Initialisation des variables

var root = document.documentElement;
var divicon = document.getElementById('themeBtn');
var iconClasses = document.getElementsByClassName('iconeThemeBtn')[0];
var logo = document.getElementById('logo');
var boutonHaut = document.querySelector("#retournerHaut");
var graphImage = document.querySelector("body > div.principal > section > div > div.container > img")

var webp = document.location.pathname
var webpage = webp.split('/')
var page = webpage.pop()

/**
 * Changement du thème du site à l'appel de la fonction, qui prend effet en cliquant sur l'icône de changement.
 */

divicon.onclick = function() {
    let nomTheme;
    let nomThemeOppose;
    if (document.body.classList.contains('light')) {
        // Changement de la valeur des variables et du style CSS (mode clair)
        if (page === "international.html") {
            graphImage.style.filter = 'invert(0)';
            graphImage.style.transition = ".5s";
        }
        // Changement de la valeur des variables JS (mode clair)
        nomTheme = "light";
        nomThemeOppose = "dark";

    } else if (document.body.classList.contains('dark')) {

        // Changement de la valeur des variables et du style CSS (mode sombre)

        if (page === "international.html") {
            graphImage.style.filter = 'invert(1)';
            graphImage.style.transition = ".5s";

        }
        nomTheme = "dark";
        nomThemeOppose = "light";
    }
    document.body.classList.remove(nomTheme);
    document.body.classList.add(nomThemeOppose);

    if (document.body.classList.contains('light')) {
        root.style.setProperty('--bg-color', '#fff');
        root.style.setProperty('--bg-variant', "#ededed");
        root.style.setProperty('--font-title', '#444');
        root.style.setProperty('--font-paragraph', "#4e4e4e");
        root.style.setProperty('--button-color', '#D65A31');
        root.style.colorScheme = 'light'; // Non supporté sur Firefox...
        logo.style.filter = 'invert(0)';
        logo.style.transition = ".5s";

    } else if (document.body.classList.contains('dark')) {
        root.style.setProperty('--bg-color', '#222831');
        root.style.setProperty('--bg-variant', '#393e46');
        root.style.setProperty('--font-title', '#eee');
        root.style.setProperty('--font-paragraph', "#cecece");
        root.style.setProperty('--button-color', '#D65A31');
        root.style.colorScheme = 'dark';
        logo.style.filter = 'invert(1)';
        logo.style.transition = ".5s";
    }
}

/**
 * Détecte lorsque l'utilisateur descend à un certain niveau de la page
 */

function descendre() {
	/*
	 * NOTE: document.documentElement.scrollTop fonctionne sur google chrome
	 * tandis que document.body.scrollTop fonctionne sur firefox.
	 */
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
