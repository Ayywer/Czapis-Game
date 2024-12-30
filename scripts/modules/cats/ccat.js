//Script for cats

import { db, player, saveData, timers, updateFields, upgr } from "../database/loaddb.js";
import { levelup } from "../player/playermanager.js";
import { showToast } from "../toastnotif.js";

import { updatecatui, updateplayerui } from "../updateui.js";
import { getRandomCat } from "./generateCat.js";

//Current Cat Data
export let currentCat = {}
let CatHealth

export function newCat() {
    currentCat = getRandomCat()
    var rarity = 1
    if (timers.timer1 > 0) {
        rarity = 2
    }
    if (timers.timer2 > 0) {
        rarity = 3
    }
    if (timers.timer3 > 0) {
        rarity = 4
    }
    if (timers.timer4 > 0) {
        rarity = 5
    }
    switch (rarity) {

        case 2:
            while (currentCat.rarity == "COMMON") { //timer1
                currentCat = getRandomCat()
                //higher than common
            }
            break;
        case 3:
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE") { //timer 2
                currentCat = getRandomCat()
                //higher than rare
            }
            break;
        case 4:
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "EPIC") { //timer3
                currentCat = getRandomCat()
                //higher than epic
            }
            break;
        case 5:
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "EPIC" || currentCat.rarity == "LEGENDARY") { //timer4
                currentCat = getRandomCat()
                //only mythical
            }
            break;
    }

    updatecatui()
    CatHealth = currentCat.hp
    //console.log(CatHealth)

}

export function newbettercat() {
    switch (currentCat.rarity) {
        case "COMMON":
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "MYTHICAL" || currentCat.rarity == "EPIC" || currentCat.rarity == "LEGENDARY") {
                currentCat = getRandomCat()
            }
            break;
        case "RARE":
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "MYTHICAL" || currentCat.rarity == "LEGENDARY") {
                currentCat = getRandomCat()
            }
            break;
        case "EPIC":
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "EPIC" || currentCat.rarity == "MYTHICAL") {
                currentCat = getRandomCat()
            }
            break;
        case "LEGENDARY":
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "EPIC" || currentCat.rarity == "LEGENDARY") { //timer4
                currentCat = getRandomCat()
            }
            break
        case "MYTHICAL":
            while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "EPIC" || currentCat.rarity == "LEGENDARY") { //timer4
                currentCat = getRandomCat()

            }
            break
    }
    CatHealth = currentCat.hp
    updatecatui()
}

export function onlyMythical() {
    while (currentCat.rarity == "COMMON" || currentCat.rarity == "RARE" || currentCat.rarity == "EPIC" || currentCat.rarity == "LEGENDARY") { //timer4
        currentCat = getRandomCat()
        CatHealth = currentCat.hp
    }
}

// Click Mechanic
export function clickCat() {
    if (currentCat.hp > 0) {
        currentCat.hp -= 1 + upgr.upgr1;
        updatecatui();
        if (currentCat.hp <= 0) {
            handleCatCapture();
        }
    }
}

async function handleCatCapture() {
    let escapeRoll = Math.random(); 
    escapeRoll += parseFloat((upgr.upgr2 / 10).toFixed(1))

    if (escapeRoll > currentCat.escapeChance) {
        showToast(`You have captured a ${currentCat.name}!`)
        await updateFields(player, [
            {
                field: "money", value: CatHealth, option: 1
            },
            {
                field: "exp", value: 5 * (currentCat.escapeChance * 10), option: 1
            }
        ])
        updateCatData(currentCat.id);
        levelup();
        updateplayerui()

    } else {
        showToast(`Wild cat has escaped!`)
    }
    newCat()
}

function updateCatData(catId) {
    const transaction = db.transaction(["cats"], "readwrite");
    const store = transaction.objectStore("cats");

    const request = store.get(catId);
    request.onsuccess = (event) => {
        const cat = event.target.result || { id: catId, catchCount: 0 };
        cat.catchCount++;
        store.put(cat);
    };

    request.onerror = () => {
        console.error("Failed to update cat data.");
    };
}
