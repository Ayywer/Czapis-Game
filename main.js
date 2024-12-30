import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "./favicon.ico",
        webPreferences: {
            preload: path.join(path.resolve(), 'preload.js'),
            //preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, <- tests...
            contextIsolation: true,

        }
    });

    win.loadFile('./public/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
