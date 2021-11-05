// Initialisation des variables
var divicon = document.getElementById('themeBtn');
var logo = document.getElementById('logo');
var boutonHaut = document.querySelector("#retournerHaut");
var graphImage = document.querySelector("body > div.principal > section > div > div.container > img");
var page = document.location.pathname.split('/').pop();

/**
 * Changement du thème du site à l'appel de la fonction, qui prend effet en cliquant sur l'icône de changement.
 */

function changerTheme() {
    let nomTheme;
    let nomThemeOppose;
    if (document.body.classList.contains('light')) {
        // Changement de la valeur des variables JS (mode clair)
        nomTheme = "light";
        nomThemeOppose = "dark";
        document.body.classList.remove(nomTheme);
        document.body.classList.add(nomThemeOppose);

    } else if (document.body.classList.contains('dark')) {
        nomTheme = "dark";
        nomThemeOppose = "light";
        document.body.classList.remove(nomTheme);
        document.body.classList.add(nomThemeOppose);
    } else if (document.body.classList.length === 0) {
        nomTheme = "light";
        nomThemeOppose = "dark";
        document.body.classList.add(nomThemeOppose);
    }

    if (localStorage.getItem('theme') !== null) {
        localStorage.removeItem('theme');
        localStorage.setItem('theme', nomThemeOppose);
    } else {
        localStorage.setItem('theme', nomThemeOppose)
    }
}

/**
 * Détecte lorsque l'utilisateur descend à un certain niveau de la page, et modifie les propriétés du bouton associé
 */

function descendre() {
    /*
     * NOTE: document.documentElement.scrollTop ne fonctionne que sur Chromium
     * tandis que document.body.scrollTop ne fonctionne que sur Firefox
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

/**
 * Met à jour le scroll indicator à chaque fois que l'utilisateur scroll
 */

function updateScrollIndicator() {
    var scroll = document.body.scrollTop || document.documentElement.scrollTop;
    var hauteur = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var descendu = (scroll / hauteur) * 100; // Avoir un pourcentage de ce qu'a descendu l'utilisateur
    document.getElementsByClassName('indicateurScroll')[0].style.width = descendu + "%";
    // Pour éviter les erreurs
    if (document.body.contains(boutonHaut)) {
        descendre();
    }
}

/**
 * Fonctin appelée au chargement de la page, qui permet de changer le thème du site en fonction de la valeur de la variable localStorage
 */

function definirTheme() {
    if (document.body.classList.length === 0 && localStorage.getItem('theme') === null) {
        document.body.classList.add('light');
    } else {
        document.body.classList.add(localStorage.getItem('theme'));
    }
}

// Appel des fonctions aux différents événements

window.onscroll = function() {
    updateScrollIndicator();
}

window.onload = function() {
    definirTheme();
}

divicon.onclick = function() {
    changerTheme();
}