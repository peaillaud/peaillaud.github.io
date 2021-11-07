var items = document.querySelectorAll(".frise li");

/**
 * On regarde si l'élément est dans le champ de vision de l'utilisateur (crédit du code : StackOverflow)
 * @param {object} element - Élément donné
 * @returns {boolean}
 */

function champDeVision(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Fonction qui ajoute la classe 'friseActif' à chaque élément rentrant dans le champ de vision, à l'aide de la fonction champDeVision()
 */
function ajoutClasse() {
    for (var i = 0; i < items.length; i++) {
        if (champDeVision(items[i])) {
            items[i].classList.add("friseActif");
        }
        if (!champDeVision(items[i]) && items[i].classList.contains("friseActif")) {
            items[i].classList.remove("friseActif");
        }
    }
}

// Application d'un eventListener sur les événements load, scroll et resize (au cas où l'utilisateur effectuerait un dézoom).
window.addEventListener("load", ajoutClasse);
window.addEventListener('resize', ajoutClasse)
window.addEventListener("scroll", ajoutClasse);