import { TestButton } from "./game.js";
import { clickCat } from "./modules/cats/ccat.js";
import { closecoll, opencoll } from "./modules/collection.js";
import { inv, updateFields, player } from "./modules/database/loaddb.js";
import { openinv, closeinv, useItem, startAllTimers } from "./modules/inventory.js";
import { closeProfile, openProfile } from "./modules/profile.js";
import { buyItem, buyUpgrade, closeShop, openShop } from "./modules/shop.js";
import { showToast } from "./modules/toastnotif.js";
import { TheForest, TheTown, updateplayerui, updateprofileui } from "./modules/updateui.js";

document.getElementById("inventory-button").addEventListener("click", openinv);
document.getElementById("close-inventory").addEventListener("click", closeinv);

document.getElementById("collection-button").addEventListener("click", opencoll);
document.getElementById("close-collection").addEventListener("click", closecoll);

document.getElementById("profile-button").addEventListener("click", openProfile);
document.getElementById("close-profile").addEventListener("click", closeProfile);

document.getElementById("shop-button").addEventListener("click", openShop)
document.getElementById("close-shop").addEventListener("click", closeShop)

//inv
document.querySelectorAll(".use-item-btn").forEach((button) => {
    button.addEventListener("click", () => {
        setitemsid()
        const itemValue = button.value;
        if (itemValue) {
            useItem(itemValue);
        } else {
            console.error("Atrybut data-item-id jest pusty lub nie istnieje.");
        }
    });
});

function setitemsid() {
    let test = 0;
    document.querySelectorAll(".use-item-btn").forEach((button) => {
        for (let x = test; x < inv.items.length; x++) {
            button.value = inv.items[x].id
            test += 1;
            return
        }
    })
}

//shop
document.querySelectorAll(".buy-item-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const itemValue = button.value;
        if (itemValue) {
            buyItem(itemValue);
        } else {
            console.error("Atrybut data-item-id jest pusty lub nie istnieje.");
        }
    });
});

document.querySelectorAll(".buy-upgrade-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const itemValue = button.value;
        if (itemValue) {
            buyUpgrade(itemValue);
        } else {
            console.error("Atrybut data-item-id jest pusty lub nie istnieje.");
        }
    });
});

document.getElementById("forest-button").addEventListener("click", TheForest)
document.getElementById("town-button").addEventListener("click", TheTown)
document.getElementById("cat-button").addEventListener("click", clickCat)

//document.getElementById("test").addEventListener("click", TestButton)

let saveplayername = document.getElementById("player-name-input")
const saveNameButton = document.getElementById("save-name");
saveplayername.value = player.name

saveNameButton.addEventListener("click", async () => {
    let playername = saveplayername.value || "player"

    await updateFields(player, [
        {
            field: "name", value: playername, option: 2
        }
    ])
    showToast(`Saved new name ${playername}`)
    updateplayerui()
});