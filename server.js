const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Serwowanie statycznych plików z katalogu projektu
app.use(express.static(path.join(__dirname)));

// Start serwera
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
