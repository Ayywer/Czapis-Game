//All ui updates

import { player, inv, db, upgr } from "./database/loaddb.js";
import { gameitems } from "./classes/items.js";
import { currentCat } from "./cats/ccat.js";
import { forestcats } from "./classes/cats.js";
import { setUpgradesCost, shopitems, shopupgrades } from "./classes/shopitems.js";

export function TheTown() {
    document.getElementById("game-panel").style.backgroundImage = `url(../assets/Backgrounds/town.png)`
    hidecatstuff()
    showtownstuff()
}

export function TheForest() {
    document.getElementById("game-panel").style.backgroundImage = `url(../assets/Backgrounds/forest.png)`
    hidetownstuff()
    showcatstuff()
}

function hidecatstuff() {
    document.getElementById("cat-info").style.display = 'none';
    document.getElementById("healthbar").style.display = 'none';
}

function showcatstuff() {
    document.getElementById("cat-info").style.display = 'inline';
    document.getElementById("healthbar").style.display = 'inline';
}

function hidetownstuff() {
    document.getElementById("shop-button").style.display = 'none';
}

function showtownstuff() {
    document.getElementById("shop-button").style.display = 'inline';
}

export function updatecatui() {
    document.getElementById("cat-name").textContent = currentCat.name;
    document.getElementById("cat-hp").textContent = `Health: ${currentCat.hp}/${forestcats[currentCat.id - 1].hp}`;
    document.getElementById("cat-button").style.backgroundImage = `url(../assets/Cats/${currentCat.imageName})`
    document.getElementById("cat-rarity").textContent = currentCat.rarity;
    switch (currentCat.rarity) {
        case "COMMON":
            document.getElementById("cat-rarity").style.color = 'grey';
            break;
        case "RARE":
            document.getElementById("cat-rarity").style.color = 'blue';
            break;
        case "EPIC":
            document.getElementById("cat-rarity").style.color = 'purple';
            break;
        case "LEGENDARY":
            document.getElementById("cat-rarity").style.color = 'orange';
            break;
        case "MYTHICAL":
            document.getElementById("cat-rarity").style.color = 'black';
            break;
    }
}

export function updateplayerui() {
    document.getElementById("player-name").textContent = `${player.name}`;
    document.getElementById("player-level").textContent = `Level: ${player.level} ${player.exp}/${player.maxexp}`;
    document.getElementById("player-money").textContent = `Money: ${player.money}$`;
    document.getElementById("player-tokens").textContent = `Tokens: ${player.token}`;

}

export function updateinventoryui() {
    let itemcount = 0

    //Item Name
    document.querySelectorAll(".item-name").forEach((name) => {
        for (let x = itemcount; x < 5; x++) {
            for (let z = 0; z < gameitems.length; z++) {
                if (inv.items[x].id == gameitems[z].id) {
                    name.textContent = gameitems[z].name
                    itemcount += 1;
                    return
                }
            }

        }
    })

    itemcount = 0

    //Item Quantity
    document.querySelectorAll(".item-quantity").forEach((count) => {
        for (let x = itemcount; x < 5; x++) {
            if (inv.items[x].count >= 1) {
                count.textContent = `x${inv.items[x].count}`
                itemcount += 1;
                return
            } else {
                count.textContent = ''
                itemcount += 1;
                return
            }


        }
    })

    itemcount = 0

    //Use Button
    document.querySelectorAll(".use-item-btn").forEach((button) => {
        for (let x = itemcount; x < 5; x++) {
            if (inv.items[x].count >= 1) {
                button.style.display = 'inline'
                itemcount += 1;
                return
            } else {
                button.style.display = 'none'
                itemcount += 1;
                return
            }


        }
    })

}

export function updateshopui() {
    setUpgradesCost()

    let shopitemcount = 0

    //Item Name
    document.querySelectorAll(".shop-item-name").forEach((name) => {
        for (let x = shopitemcount; x < 8; x++) {
            name.textContent = `${shopitems[shopitemcount].name}`
            shopitemcount += 1;
            return
        }
    })

    shopitemcount = 0

    //Item Price
    document.querySelectorAll(".shop-item-price").forEach((price) => {
        for (let x = shopitemcount; x < 8; x++) {
            price.textContent = `${shopitems[shopitemcount].cost}$`
            shopitemcount += 1;
            return
        }
    })

    shopitemcount = 0

    //Item Desc
    document.querySelectorAll(".shop-item-desc").forEach((desc) => {
        for (let x = shopitemcount; x < 8; x++) {
            desc.textContent = `${shopitems[shopitemcount].desc}`
            shopitemcount += 1;
            return
        }
    })

    document.getElementById("upgrade-name-one").textContent = `${shopupgrades[0].name}`
    document.getElementById("upgrade-price-one").textContent = `${shopupgrades[0].cost}$`
    document.getElementById("upgrade-name-two").textContent = `${shopupgrades[1].name}`
    document.getElementById("upgrade-price-two").textContent = `${shopupgrades[1].cost}$`
}

export function updatecollectionui() {
    const transaction = db.transaction("cats", "readonly");
    const store = transaction.objectStore("cats");

    const request = store.getAll();

    let catcount = 0;

    request.onsuccess = (event) => {
        let playercats = []
        playercats = event.target.result

        document.querySelectorAll(".col-cat-item").forEach((cat) => {
            let value = cat.value
            for (let x = catcount; x < playercats.length; x++) {

                for (let z = 0; z < forestcats.length; z++) {

                    if (playercats[x].id == forestcats[value - 1].id) {
                        var catname = cat.getElementsByClassName("col-cat-name")[0]
                        var catimage = cat.getElementsByClassName("col-cat-image")[0]
                        var playercatcount = cat.getElementsByClassName("col-cat-count")[0]
                        var playercatrarity = cat.getElementsByClassName("col-cat-rarity")[0]
                        catname.textContent = forestcats[value - 1].name
                        catimage.src = `../assets/Cats/${forestcats[value - 1].imageName}`
                        playercatcount.textContent = `Catch count: ${playercats[x].catchCount}`
                        playercatrarity.textContent = `Rarity: ${forestcats[value - 1].rarity}`
                        catcount += 1
                        return
                    } else {
                        break;
                    }
                }

            }

        })
    }
}

export function updateprofileui() {
    let saveplayername = document.getElementById("player-name-input")
    saveplayername.value = player.name;
    document.getElementById("profile-player-level").textContent = player.level;
    document.getElementById("profile-player-upgr1").textContent = upgr.upgr1;
    document.getElementById("profile-player-upgr2").textContent = upgr.upgr2;

}