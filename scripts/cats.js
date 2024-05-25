import {SetExp, clickUpgrade} from './user.js'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function loadJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

let currentcathp = 10;

localStorage.setItem("currentcathp", currentcathp);

const catButton = document.getElementById("clickButton");
const cathp = document.getElementById("cat-health");
const catname = document.getElementById("cat-name")
const catrarity = document.getElementById("rarity")
const catraritycolor = document.querySelector('#rarity');



function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

catname.textContent = ("Common Cat")
catrarity.textContent = ("Common")
catButton.style.backgroundImage = `url('cats/CommonCat/Ccat.png')`;
cathp.textContent = ("10/10")
catraritycolor.style.color = "#808080"

catButton.addEventListener("click", () => {

    currentcathp -= clickUpgrade;
    localStorage.setItem("currentcathp", currentcathp);
    if(currentcathp <= 0)
    {
        let rarity;
        const colorChangeElement = document.querySelector('#rarity');
        loadJSON('DB/cats.json').then(data => {
            let random_cat = randomIntFromInterval(0, data.length-1)

            catname.textContent = (data[random_cat]["name"])
            catrarity.textContent = (data[random_cat]["rarity"])

            currentcathp = data[random_cat]["hp-stat"];
            cathp.textContent = (`${currentcathp}/${data[random_cat]["hp-stat"]}`)
            catButton.style.backgroundImage = `url(${data[random_cat]["path"]})`;
            rarity = data[random_cat]["rarity"]
            if(rarity == "Common")
            {
                colorChangeElement.style.color = "#808080"
            }
        });

        let expToAdd = parseInt(randomIntFromInterval(1, 5))
        
        SetExp(expToAdd);
    }
});
