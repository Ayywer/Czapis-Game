export function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    const container = document.getElementById("toast-container");
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, duration);
}

