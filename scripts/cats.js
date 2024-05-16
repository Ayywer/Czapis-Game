import {level, exp, Maxexp,money,clickUpgrade} from './user.js'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let currentcathp = parseInt(localStorage.getItem("currentcathp")) || 10;

localStorage.setItem("currentcathp", currentcathp);

const catButton = document.getElementById("clickButton");
const cathp = document.getElementById("cat-health");

catButton.addEventListener("click", () => {
    currentcathp -= clickUpgrade;
    cathp.textContent = (`${currentcathp}/10`)
    localStorage.setItem("currentcathp", currentcathp);
    if(currentcathp <= 0)
    {

    }
});