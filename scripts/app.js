var divicon = document.getElementById('themeBtn');
var boutonHaut = document.querySelector("#retournerHaut");
var root = document.querySelector(':root');

/**
 * Changement du thème du site à l'appel de la fonction, qui prend effet en cliquant sur l'icône de changement.
 */

function changerTheme() {
    let nomThemeActif;
    let nomThemeOppose;
    if (document.body.classList.contains('light')) {
        nomThemeActif = "light";
        nomThemeOppose = "dark";
        document.body.classList.remove(nomThemeActif);
        document.body.classList.add(nomThemeOppose);
        root.style.colorScheme = nomThemeOppose;

    } else if (document.body.classList.contains('dark')) {
        nomThemeActif = "dark";
        nomThemeOppose = "light";
        document.body.classList.remove(nomThemeActif);
        document.body.classList.add(nomThemeOppose);
        root.style.colorScheme = nomThemeOppose;
    } else if (document.body.classList.length === 0) {
        nomThemeActif = "light";
        nomThemeOppose = "dark";
        document.body.classList.add(nomThemeOppose);
        root.style.colorScheme = nomThemeOppose;
    }

    if (navigator.cookieEnabled === true) { // Pour enregistrer le choix de l'utilisateur
        if (localStorage.getItem('theme') !== null) {
            localStorage.removeItem('theme');
            localStorage.setItem('theme', nomThemeOppose);
        } else {
            localStorage.setItem('theme', nomThemeOppose);
        }
    } else if (navigator.cookieEnabled === false) return; // On ne crée pas d'erreur si l'utilisateur n'a pas activé les cookies


}

/**
 * Détecte lorsque l'utilisateur descend à un certain niveau de la page, et modifie les propriétés du bouton "Retourner en haut" associé
 */

function descendre() {
    /*
     * NOTE: document.documentElement.scrollTop ne fonctionne que sur Chromium
     *       tandis que document.body.scrollTop ne fonctionne que sur le reste
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
 * Fonction appelée au chargement de la page, qui permet de changer le thème du site en fonction de la valeur de la variable localStorage
 */

function definirTheme() {

    if (navigator.cookieEnabled === true) { // On regarde si l'utilisateur a activé les cookies
        if (document.body.classList.length === 0 && localStorage.getItem('theme') === null) {
            document.body.classList.add('light');
            root.style.colorScheme = 'light';
        } else {
            document.body.classList.add(localStorage.getItem('theme'));
            root.style.colorScheme = localStorage.getItem('theme');
        }
    } else { // Sinon, le body n'a pas de classe et ne s'affichera pas correctement, car les variables ne seront pas chargées
        document.body.classList.add('light');
        root.style.colorScheme = 'light';
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