import { updateprofileui } from "./updateui.js";

const profileWindow = document.getElementById("profile-window");

export function openProfile() {
    profileWindow.classList.add("visible");
    updateprofileui()
}

export function closeProfile() {
    profileWindow.classList.remove("visible");
}
