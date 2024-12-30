import { newbettercat, newCat, onlyMythical } from "./cats/ccat.js";
import { shopitems } from "./classes/shopitems.js";
import { db, inv, timers, updateFields } from "./database/loaddb.js";
import { showToast } from "./toastnotif.js";
import { updatecatui, updateinventoryui } from "./updateui.js";

const inventoryWindow = document.getElementById("inventory-window");

export function openinv() {
    inventoryWindow.classList.add("visible");
    updateinventoryui()
}

export function closeinv() {
    inventoryWindow.classList.remove("visible");
}

export function addItem(itemID, count) {
    let foundItem = false;
    for (let i = 0; i < inv.items.length; i++) {
        if (inv.items[i].id == itemID) {
            updateItems("items", "count", i, count, 1)
            foundItem = true;
            return;
        }
    }
    if (foundItem == false) {
        for (let z = 0; z < inv.items.length; z++) {
            if (inv.items[z].id == 0) {
                updateItems("items", "count", z, 1, 2)
                updateItems("items", "id", z, itemID, 2)
                foundItem = true;
                return;
            }
        }

    }
    if (foundItem == false) {
        showToast("You don't have empty space in your inventory!")
    }
}

export function updateItems(field, Bfield, index, value, option) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("player_stats", "readwrite");
        const store = transaction.objectStore("player_stats");

        const request = store.get(inv.id);

        request.onsuccess = (event) => {
            const playerData = event.target.result;

            if (playerData && playerData !== undefined) {
                if (Array.isArray(playerData[field])) {
                    if (playerData[field][index]) {
                        if (option === 1) {
                            playerData[field][index][Bfield] += value;
                        } else {
                            playerData[field][index][Bfield] = value;
                        }
                    } else {
                        console.error(`There is no element of index ${index} on ${field}`);
                        return;
                    }
                } else {
                    console.log("err")
                    return
                }
                Object.assign(inv, playerData);
                const updateRequest = store.put(playerData);

                updateRequest.onsuccess = () => {
                    updateinventoryui()
                    resolve()
                };

                updateRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            } else {
                reject(new Error("There is not data"));
            }
        };

        request.onerror = (event) => {
            console.error("Error with loading data:", event.target.error);
        };
    })
}

export async function useItem(itemID) {
    let foundItem = false
    let index
    for (let x = 0; x < inv.items.length; x++) {
        if (inv.items[x].id == itemID) {
            if (inv.items[x].count > 0) {
                await updateItems("items", "count", x, -1, 1)
                if (inv.items[x].count == 0) {
                    await updateItems("items", "id", x, 0, 2)
                }
                foundItem = true
                index = x
                break;
            }
        }
    }
    if (foundItem === true) {
        switch (shopitems[itemID - 1].id) {
            case 1:
                if (timers.timer1 == 0) {
                    await updateFields(timers, [
                        {
                            field: "timer1", value: 160, option: 1
                        }
                    ])
                    startTimer("timer1");
                    showToast(`You have used Sweet Berry`)
                    break;
                } else {
                    showToast(`This effect is in use!`)
                    await updateItems("items", "count", index, 1, 1)
                    await updateItems("items", "id", index, itemID, 2)
                    break;
                }
            case 2:
                if (timers.timer2 == 0) {
                    await updateFields(timers, [
                        {
                            field: "timer2", value: 100, option: 1
                        }
                    ])
                    startTimer("timer2");
                    showToast(`You have used Sour Berry`)
                    break;
                } else {
                    showToast(`This effect is in use!`)
                    await updateItems("items", "count", index, 1, 1)
                    await updateItems("items", "id", index, itemID, 2)
                    break;
                }
            case 3:
                if (timers.timer3 == 0) {
                    await updateFields(timers, [
                        {
                            field: "timer3", value: 30, option: 1
                        }
                    ])
                    startTimer("timer3");
                    showToast(`You have used Spicy Berry`)
                    break;
                } else {
                    showToast(`This effect is in use!`)
                    await updateItems("items", "count", index, 1, 1)
                    await updateItems("items", "id", index, itemID, 2)
                    break;
                }
            case 4:
                if (timers.timer4 == 0) {
                    await updateFields(timers, [
                        {
                            field: "timer4", value: 10, option: 1
                        }
                    ])
                    startTimer("timer4");
                    showToast(`You have used Mythical Berry`)
                    break;
                } else {
                    showToast(`This effect is in use!`)
                    await updateItems("items", "count", index, 1, 1)
                    await updateItems("items", "id", index, itemID, 2)
                    break;
                }
            case 5:
                showToast(`You have used Refresh Orb`)
                newCat()
                break;
            case 6:
                showToast(`You have used Summon Token`)
                newbettercat()
                break
            case 7:
                showToast(`You have used Mystic Lure`)
                onlyMythical()
                updatecatui()
                break;
            default:
                showToast(`This item has no use`)
                await updateItems("items", "count", index, 1, 1)
                await updateItems("items", "id", index, itemID, 2)

        }
    } else {
        showToast(`You don't have this item`)
    }
    updateinventoryui()
    return
}

export function startTimer(timerName) {
    if (timers.hasOwnProperty(timerName)) {
        if (timers[timerName] > 0) {
            const interval = setInterval(async () => {
                if (timers[timerName] > 0) {
                    timers[timerName] -= 1;
                    await updateFields(timers, [
                        {
                            field: `${timerName}`, value: -1, option: 1
                        }
                    ])
                } else {
                    clearInterval(interval);
                    showToast(`The effect has expired!`)
                    await updateFields(timers, [
                        {
                            field: `${timerName}`, value: 0, option: 2
                        }
                    ])
                }
            }, 1000);
        } else {
            console.log(`Timer ${timerName} is on 0.`);
        }
    } else {
        console.error(`Timer ${timerName} doesn't exist`);
    }
}

export async function startAllTimers() {
    if (timers.timer1 > 0) {
        startTimer("timer1")
        showToast("Sweet Berry effect has ben resumed")

    }
    if (timers.timer2 > 0) {
        startTimer("timer2")
        showToast("Sour Berry effect has ben resumed")

    }
    if (timers.timer3 > 0) {
        startTimer("timer3")
        showToast("Spicy Berry effect has ben resumed")

    }
    if (timers.timer4 > 0) {
        startTimer("timer4")
        showToast("Mythical Berry effect has ben resumed")
    }
}