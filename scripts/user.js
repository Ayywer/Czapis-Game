function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export let level = parseInt(localStorage.getItem("level")) || 1;
export let exp = parseInt(localStorage.getItem("exp")) || 0;
export let Maxexp = parseInt(localStorage.getItem("Maxexp")) || 100;
export let money = parseInt(localStorage.getItem("money")) || 0;
export let clickUpgrade = parseInt(localStorage.getItem("clickUpgrade")) || 1;

localStorage.setItem("level", level);
localStorage.setItem("exp", exp);
localStorage.setItem("Maxexp", Maxexp);
localStorage.setItem("money", money);
localStorage.setItem("clickUpgrade", clickUpgrade);

let moneyElement = document.getElementById("money")
let LevelElement = document.getElementById("level")
let ExpElement = document.getElementById("exp")

moneyElement.textContent = money;
LevelElement.textContent = level;
ExpElement.textContent = exp;

function saveProgress() {
    document.cookie = `score=${score}; max-age=${60 * 60 * 24 * 365}`; // Zapisanie liczby punktów na rok
    document.cookie = `multiplier=${multiplier}; max-age=${60 * 60 * 24 * 365}`; // Zapisanie mnożnika na rok
    
    localStorage.setItem("level", level);
    localStorage.setItem("exp", exp);
    localStorage.setItem("Maxexp", Maxexp);
    localStorage.setItem("money", money);
    localStorage.setItem("clickUpgrade", clickUpgrade);
}

function nextLevel() {
    if(exp >= Maxexp) {
        exp = 0;
        Maxexp += 100 * level;
        level += 1;
        saveProgress();
    }
}