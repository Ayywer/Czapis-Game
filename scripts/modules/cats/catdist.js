import { forestcats } from "../classes/cats.js"

export let distribution = []

for (let z in forestcats) {
    for (let i = 0; i < forestcats[z].weight; i++) {
        distribution.push(z)
    }
}