import {SetExp, clickUpgrade} from './user.js'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let currentcathp = parseInt(localStorage.getItem("currentcathp")) || 10;

localStorage.setItem("currentcathp", currentcathp);

const catButton = document.getElementById("clickButton");
const cathp = document.getElementById("cat-health");

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

catButton.addEventListener("click", () => {
    currentcathp -= clickUpgrade;
    cathp.textContent = (`${currentcathp}/10`)
    localStorage.setItem("currentcathp", currentcathp);
    if(currentcathp <= 0)
    {
        /* Proces losowania następnego kota */

        currentcathp = 10;
        cathp.textContent = (`${currentcathp}/10`)

        let expToAdd = parseInt(randomIntFromInterval(1, 5))

        SetExp(expToAdd);
    }
});
