export class item {
    constructor(
        id = 0, count = 0
    ) {
        this.id = id
        this.count = count
    }
}

//Data for items (inventory)

export const gameitems = [
    { id: 0, name: "", canUse: false },
    { id: 1, name: "Sweet Berry", canUse: true },
    { id: 2, name: "Sour Berry", canUse: true },
    { id: 3, name: "Spicy Berry", canUse: true },
    { id: 4, name: "Mythical Berry", canUse: true },
    { id: 5, name: "Refresh Orb", canUse: true },
    { id: 6, name: "Summon Token", canUse: true },
    { id: 7, name: "Mystic Lure", canUse: true },
]