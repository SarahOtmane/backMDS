const Command = require('../models/commandModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');




/**********************************************************
            MÉTHODE POUR CREER UNE COMMANDE
**********************************************************/
/*
    Fonction qui permet à un user de créer une commande

    Les vérifications : 
        - l existance de l artisan
        - l existance de la prestation

*/
exports.createACommand = async (req, res) => {
    try {
        const existingArtisan = await Artisan.findOne({ where: { id: req.params.id_artisan } });
        if (!existingArtisan) {
            return res.status(401).json({ message: 'L\'artisan n\'existe plus en base de données.' });
        }

        const existingPresta = await Prestation.findOne({where: {
            categorie: req.body.categorie,
            clothType: req.body.clothType,
            reparationType: req.body.reparationType
        }})

        if(!existingPresta) return res.status(401).json({message: 'La prestation n\'existe plys en base de donnés'})

        let NewCommand = await Command.create({
            name: req.body.name,
            picture: req.body.picture,
            dateFinished: false,
            id_artisan: req.params.id_artisan,
            id_user: req.user.id,
            id_prestation: existingPresta.id,
        });

        res.status(201).json({ 
            message: `Info créé avec succès. Le nom : ${NewCommand.name}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};
