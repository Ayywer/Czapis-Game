import { shopitems, shopupgrades } from "./classes/shopitems.js";
import { inv, player, updateFields, upgr } from "./database/loaddb.js";
import { addItem } from "./inventory.js";
import { showToast } from "./toastnotif.js";
import { updateinventoryui, updateplayerui, updateshopui } from "./updateui.js";

const shopWindow = document.getElementById("shop-window");

export function openShop() {
    shopWindow.classList.add("visible");
    updateshopui()
}

export function closeShop() {
    shopWindow.classList.remove("visible");
}

export async function buyItem(itemID) {
    if (!shopitems[itemID - 1]) {
        console.log("This item doesn't exist!")
        return;
    }

    let price = -shopitems[itemID - 1].cost
    let canbuy = false
    let tempinv = {}
    tempinv = inv

    if (player.money >= Math.abs(price)) {
        let foundItem = false;
        for (let i = 0; i < inv.items.length; i++) {
            if (inv.items[i].id == itemID) {
                foundItem = true;
                break;
            }
        }
        if (foundItem == false) {
            for (let z = 0; z < inv.items.length; z++) {
                if (inv.items[z].id == 0) {
                    foundItem = true;
                    break;
                }
            }
        }
        if (itemID == 8) {
            foundItem = true //token check
        }
        if (foundItem == false) {
            showToast("You don't have empty space in your inventory!")
            return
        }
        if (foundItem == true) {
            canbuy = true
            await updateFields(player, [
                {
                    field: "money", value: price, option: 1
                }
            ])
            updateplayerui()
            updateinventoryui()
            showToast(`${shopitems[itemID - 1].name} has been bought successfully!`)
        }
    } else {
        canbuy = false
        showToast(`You don't have enough money!`)
    }
    if (canbuy == true) {
        switch (itemID - 1) {
            case 7:
                await updateFields(player, [
                    {
                        field: "token", value: 1, option: 1
                    }
                ])
                updateplayerui()
                updateinventoryui()
                break;
            default:
                addItem(itemID, 1)
                updateplayerui()
                updateinventoryui()
                break;
        }
    }
}

export async function buyUpgrade(upgradeID) {
    if (!shopitems[upgradeID - 1]) {
        console.log("This upgrade doesn't exist!")
        return;
    }

    let price = -shopupgrades[upgradeID - 1].cost
    let canbuy = false

    if (player.money >= Math.abs(price)) {
        canbuy = true
        await updateFields(player, [
            {
                field: "money", value: price, option: 1
            }
        ])
        updateplayerui()
        updateshopui()
        showToast(`Upgrade ${shopupgrades[upgradeID - 1].name} has been bought successfully`)
    } else {
        canbuy = false
        showToast(`You don't have enought money!`)
    }
    if (canbuy == true) {
        upgradeID = Number(upgradeID);
        switch (upgradeID) {
            case 1:
                await updateFields(upgr, [
                    {
                        field: "upgr1", value: 1, option: 1
                    }
                ])

                updateshopui()
                break;
            case 2:
                if (upgr.upgr2 < 9) {
                    await updateFields(upgr, [
                        {
                            field: "upgr2", value: 1, option: 1
                        }
                    ])
                    updateshopui()
                    break;
                } else {
                    showToast("You can't buy this upgrade anymore!")
                    await updateFields(player, [
                        {
                            field: "money", value: Math.abs(price), option: 1
                        }
                    ])
                    updateplayerui()
                    updateshopui()
                }
        }
    }
}