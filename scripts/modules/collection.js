import { updatecollectionui } from "./updateui.js";

const collectionWindow = document.getElementById("collection-window");

export function opencoll() {
    collectionWindow.classList.add("visible");
    updatecollectionui()
}

export function closecoll() {
    collectionWindow.classList.remove("visible");
}
