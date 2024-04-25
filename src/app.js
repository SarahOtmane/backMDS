const express = require('express');


const app = express();
const port = 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


// Démarrage du serveur
app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});


