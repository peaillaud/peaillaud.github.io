var root = document.documentElement;

var divicon = document.getElementById('themeBtn');
var icon = document.getElementsByClassName('iconeThemeBtn')[0];
var logo = document.getElementById('logo');


divicon.onclick = function() {
    let moonOrSun;
    let inverse;
    if (icon.classList.contains('fa-moon')) {

        // Changement de la valeur des variables CSS (mode clair)

        root.style.setProperty('--bg-color', '#eff0f3');
        root.style.setProperty('--navbar-bg', "#e1e2e6");
        root.style.setProperty('--font-title', '#0d0d0d');
        root.style.setProperty('--font-paragraph', "#2a2a2a");
        root.style.setProperty('--button-color', '#ff8e3c');
        root.style.colorScheme = 'light';
        logo.style.filter = 'invert(0)';
        logo.style.transition = ".5s";

        // Changement de la valeur des variables JS (mode clair)
        moonOrSun = "fa-sun";
        inverse = "fa-moon";
    } else if (icon.classList.contains('fa-sun')) {

        // Changement de la valeur des variables CSS (mode sombre)
        root.style.setProperty('--bg-color', '#0f0e17');
        root.style.setProperty('--navbar-bg', '#171529f5');
        root.style.setProperty('--font-title', '#fffffe');
        root.style.setProperty('--font-paragraph', "#a7a9be");
        root.style.setProperty('--button-color', '#ff8906');
        root.style.colorScheme = 'dark';
        logo.style.filter = 'invert(1)';
        logo.style.transition = ".5s";


        // Changement de la valeur des variables JS (mode sombre)
        moonOrSun = "fa-moon";
        inverse = "fa-sun";
    }

    icon.classList.remove(inverse);
    icon.classList.add(moonOrSun);
}