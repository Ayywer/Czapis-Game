//Player location script

import { player, updateFields } from "../database/loaddb.js";
import { TheForest, TheTown } from "../updateui.js";

export function setlocation(location) {
    switch (location) {
        case 1:
            updateFields(player, "curlocationid", 1, 2)
            TheTown()
            break;
        case 2:
            updateFields(player, "curlocationid", 2, 2)
            TheForest()
            break
        default:
            console.log("This location doesn't exist")
            break;
    }
}