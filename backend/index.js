const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const connectDB = require('./db');

connectDB();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});