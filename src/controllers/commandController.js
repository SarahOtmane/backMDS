const Command = require('../models/commandModel');
const Artisan = require('../models/artisanModel');




/**********************************************************
            MÉTHODE POUR CREER UNE COMMANDE
**********************************************************/
/*
    Fonction qui permet à un user de créer une commande

    Les vérifications : 
        - l existance de l artisan

*/
exports.createAnInfo = async (req, res) => {
    try {
        const existingArtisan = await Artisan.findOne({ where: { id: req.params.id_artisan } });
        if (!existingArtisan) {
            return res.status(401).json({ message: 'L\'artisan n\'existe plus en base de données.' });
        }

        let NewCommand = await Command.create({
            name: req.body.name,
            picture: req.body.picture,
            dateFinished: false,
            id_artisan: req.params.id_artisan,
            id_user: req.user.id,
        });

        res.status(201).json({ 
            message: `Info créé avec succès. Le nom : ${NewCommand.name}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};
