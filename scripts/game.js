import { initDB, player, updateFields } from "./modules/database/loaddb.js"
import { updateinventoryui, updateplayerui } from "./modules/updateui.js";
import { newCat } from "./modules/cats/ccat.js";
import { levelup } from "./modules/player/playermanager.js";

initDB()
await initGame()

export async function initGame() {
    console.log("Game is running!")
    newCat()
}

export async function TestButton() {
    console.log("Test Button!")

    await updateFields(player, [
        {
            field: "money", value: 1000000, option: 1
        }
    ])

    updateplayerui()
    updateinventoryui()
    levelup()
}





