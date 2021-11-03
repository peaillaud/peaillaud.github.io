// Initialisation des variables

var root = document.documentElement;
var divicon = document.getElementById('themeBtn');
var icon = document.getElementsByClassName('iconeThemeBtn')[0];
var logo = document.getElementById('logo');
var boutonHaut = document.querySelector("#retournerHaut");

/**
 * Changement du thème du site à l'appel de la fonction, qui prend effet en cliquant sur l'icône de changement.
 */

divicon.onclick = function() {
    let moonOrSun;
    let inverse;
    if (icon.classList.contains('fa-moon')) {

        // Changement de la valeur des variables et du style CSS (mode clair)

        root.style.setProperty('--bg-color', '#fff');
        root.style.setProperty('--bg-variant', "#ededed");
        root.style.setProperty('--font-title', '#444');
        root.style.setProperty('--font-paragraph', "#4e4e4e");
        root.style.setProperty('--button-color', '#D65A31');
        root.style.colorScheme = 'light'; // Non supporté sur Firefox...
        logo.style.filter = 'invert(0)';
        logo.style.transition = ".5s";

        if (document.location.pathname === "/pages/international.html") {
            document.querySelector("body > div.principal > section > div > div.container > img").style.filter = 'invert(0)';
            document.querySelector("body > div.principal > section > div > div.container > img").style.transition = ".5s";
        }

        // Changement de la valeur des variables JS (mode clair)
        moonOrSun = "fa-sun";
        inverse = "fa-moon";
    } else if (icon.classList.contains('fa-sun')) {

        // Changement de la valeur des variables et du style CSS (mode sombre)
        root.style.setProperty('--bg-color', '#222831');
        root.style.setProperty('--bg-variant', '#393e46');
        root.style.setProperty('--font-title', '#eee');
        root.style.setProperty('--font-paragraph', "#cecece");
        root.style.setProperty('--button-color', '#D65A31');
        root.style.colorScheme = 'dark';
        logo.style.filter = 'invert(1)';
        logo.style.transition = ".5s";

        if (document.location.pathname === "/pages/international.html") {
            document.querySelector("body > div.principal > section > div > div.container > img").style.filter = 'invert(1)';
            document.querySelector("body > div.principal > section > div > div.container > img").style.transition = ".5s";

        }


        // Changement de la valeur des variables JS (mode sombre)
        moonOrSun = "fa-moon";
        inverse = "fa-sun";
    }

    icon.classList.remove(inverse);
    icon.classList.add(moonOrSun);
}


window.onscroll = function() {
    var scroll = document.body.scrollTop || document.documentElement.scrollTop;
    var hauteur = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var descendu = (scroll / hauteur) * 100;
    document.getElementsByClassName('indicateurScroll')[0].style.width = descendu + "%";
    descendre()
}

function descendre() {
    if (document.documentElement.scrollTop > 750 || document.body.scrollTop > 750) {
        boutonHaut.style.opacity = '1';
    } else {
        boutonHaut.style.opacity = '0';
    }
}

function retourHaut() {
    document.body.scrollTop = 0; // Pour Chrome
    document.documentElement.scrollTop = 0; // Pour le reste
}