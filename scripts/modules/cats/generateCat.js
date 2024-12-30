//Generating random cat

import { forestcats } from "../classes/cats.js"
import { distribution } from "./catdist.js"

export function getRandomCat() {

    var randomItem = distribution[Math.floor(Math.random() * distribution.length)]
    return { ...forestcats[randomItem] }

}  