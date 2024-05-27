const Prestation_Artisan = require('../models/prestation_artisanModel');
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
exports.createAPrestaArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { id: req.artisan.id} });
        if(!artisan){
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        const existingPresta = await Prestation.findOne({where: {
            categorie: req.body.categorie,
            clothType: req.body.clothType,
            reparationType: req.body.reparationType
        }})
        if(!existingPresta) return res.status(404).json({message: 'La prestation n\'existe plys en base de donnés'})

        let newPrestaArtisan = await Prestation_Artisan.create({
            price: req.body.price,
            id_artisan: artisan.id,
            id_prestation: existingPresta.id,
        });

        res.status(201).json({ 
            message: `Prestation_Artisan créée avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};