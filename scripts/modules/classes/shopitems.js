import { upgr } from "../database/loaddb.js"

//Item data (shop)
export const shopitems = [
    { id: 1, name: "Sweet Berry", cost: 1500, desc: "Better Than Common!" },
    { id: 2, name: "Sour Berry", cost: 3000, desc: "Better Than Rare!" },
    { id: 3, name: "Spicy Berry", cost: 5000, desc: "Better Than Epic!" },
    { id: 4, name: "Mythical Berry", cost: 10000, desc: "Only Mythical!" },
    { id: 5, name: "Refresh Orb", cost: 4000, desc: "New Cat" },
    { id: 6, name: "Summon Token", cost: 8000, desc: "The Better One" },
    { id: 7, name: "Mystic Lure", cost: 90000, desc: "Mythical Change" },
    { id: 8, name: "Token", cost: 1000, desc: "A token. Not usefull" },
]

//Upgrades data
export let shopupgrades = [
    { id: 1, name: "Click Upgrade", cost: 100 },
    { id: 2, name: "Escape Upgrade", cost: 500 },
]

export function setUpgradesCost() {
    let upgr1cost = 100 + (500 * upgr.upgr1)
    let upgr2cost = 500 + (1000 * upgr.upgr2)
    shopupgrades[0].cost = upgr1cost
    shopupgrades[1].cost = upgr2cost

}