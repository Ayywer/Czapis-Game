function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export let level = parseInt(localStorage.getItem("level")) || 1;
export let exp = parseInt(localStorage.getItem("exp")) || 0;
export let Maxexp = parseInt(localStorage.getItem("Maxexp")) || 10;
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
ExpElement.textContent = (`${exp}/${Maxexp}`)

export function saveProgress() {
    document.cookie = `level=${level}; max-age=${60 * 60 * 24 * 365}`; // Zapisanie liczby punktów na rok
    document.cookie = `exp=${exp}; max-age=${60 * 60 * 24 * 365}`; // Zapisanie mnożnika na rok
    document.cookie = `Maxexp=${Maxexp}; max-age=${60 * 60 * 24 * 365}`;
    document.cookie = `money=${money}; max-age=${60 * 60 * 24 * 365}`;
    document.cookie = `clickUpgrade=${clickUpgrade}; max-age=${60 * 60 * 24 * 365}`;
 
    localStorage.setItem("level", level);
    localStorage.setItem("exp", exp);
    localStorage.setItem("Maxexp", Maxexp);
    localStorage.setItem("money", money);
    localStorage.setItem("clickUpgrade", clickUpgrade);

    LevelElement.textContent = level;
    ExpElement.textContent = (`${exp}/${Maxexp}`)
}

export function SetExp(value)
{
    exp += value;
    localStorage.setItem("exp", exp);
    CheckNextLevel();
    ExpElement.textContent = (`${exp}/${Maxexp}`)
}

export function CheckNextLevel() {
    if(exp > Maxexp || exp == Maxexp) {
        level += 1;
        exp -= Maxexp;
        Maxexp += 10 * level;

        localStorage.setItem("level", level);
        localStorage.setItem("exp", exp);
        localStorage.setItem("Maxexp", Maxexp);

        saveProgress();
    }
}
