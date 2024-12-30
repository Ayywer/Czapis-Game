import { player, updateFields } from "../database/loaddb.js";
import { showToast } from "../toastnotif.js";
import { updateplayerui } from "../updateui.js";

export async function levelup() {
    if (player.exp >= player.maxexp) {
        const newexp = player.exp - player.maxexp;
        const newmaxexp = (player.level + 1) * 100;

        await updateFields(player, [
            { field: "exp", value: newexp, option: 2 },
            { field: "level", value: 1, option: 1 },
            { field: "maxexp", value: newmaxexp, option: 2 }
        ]);
        updateplayerui()
        showToast(`Level up! 🎉`);

        return levelup();
    }
}
