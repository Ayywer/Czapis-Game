import { updateplayerui } from "../updateui.js";
import { item } from "../classes/items.js";
import { setlocation } from "../locations/locationswitch.js";
import { startAllTimers } from "../inventory.js";

const databaseName = "CzapisGameDB";
export let db

export let player = { id: "player1", name: "player", level: 1, exp: 0, maxexp: 100, money: 0, token: 0, curlocationid: 1 };
export let inv = { id: "playerinv", items: [new item(0, 0), new item(0, 0), new item(0, 0), new item(0, 0), new item(0, 0)] }
export let upgr = { id: "playerupgr", upgr1: 0, upgr2: 0 }
export let timers = { id: "playertimers", timer1: 0, timer2: 0, timer3: 0, timer4: 0 }

export async function initDB() {
    const request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = (event) => {
        db = event.target.result;

        if (!db.objectStoreNames.contains("player_stats")) {
            db.createObjectStore("player_stats", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("cats")) {
            db.createObjectStore("cats", { keyPath: "id" });
        }

        console.log("Data base has been updated");
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("Data base has been initialized.");

        loadDB(db);
    };

    request.onerror = (event) => {
        console.error("Error with initializing data base:", event.target.error);
    };
}

function loadDB(database) {
    if (!database) {
        console.error("Data base is not defined!");
        return;
    }

    loadPlayerStats(database, "player1", player);
    loadPlayerStats(database, "playerinv", inv);
    loadPlayerStats(database, "playerupgr", upgr);
    loadPlayerStats(database, "playertimers", timers);

}

function loadPlayerStats(database, key, Mytarget) {
    const transaction = database.transaction("player_stats", "readonly");
    const store = transaction.objectStore("player_stats");

    const request = store.get(key);

    request.onsuccess = (event) => {

        let playerStats = event.target.result;
        if (playerStats) {
            Object.assign(Mytarget, event.target.result)
            setlocation(1)
            startAllTimers()
            updateplayerui()

        } else {
            console.log("There is no data for player. Creating new...");
            saveData(database, player)
            saveData(database, inv)
            saveData(database, upgr)
            saveData(database, timers)
            setlocation(1)
            updateplayerui()
        }
    };

    request.onerror = (event) => {
        console.error("Error with loading player data:", event.target.error);
    };
}

/* Function below worked before, but became obsolete so I didn't used it */
export function saveData(database, target) {
    const transaction = database.transaction('player_stats', 'readwrite');
    const store = transaction.objectStore('player_stats');

    const request = store.put(target);

    request.onerror = (event) => {
        console.error('Error with saving data:', event.target.error);
    };
}

export function updateFields(key, updates) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(updates)) {
            updates = [updates];
        }
        const transaction = db.transaction("player_stats", "readwrite");
        const store = transaction.objectStore("player_stats");

        const request = store.get(key.id);

        request.onsuccess = (event) => {
            const data = event.target.result;

            if (data) {
                updates.forEach(({ field, value, option }) => {
                    if (option === 1) {
                        data[field] += value;
                    } else {
                        data[field] = value;
                    }
                });

                const updateRequest = store.put(data);

                updateRequest.onsuccess = () => {
                    Object.assign(key, data);
                    resolve();
                };

                updateRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            } else {
                reject(new Error("There is no data."));
            }
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}
