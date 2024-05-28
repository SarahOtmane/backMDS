const PrestationArtisan = require('../models/prestationArtisanModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');




/**********************************************************
            MÉTHODE POUR CREER UNE PRESTA_ARTISAN
**********************************************************/
/*
    Fonction qui permet de creer une presta d un artisan

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

        let newPrestaArtisan = await PrestationArtisan.create({
            price: req.body.price,
            id_artisan: artisan.id,
            id_prestation: existingPresta.id,
        });

        res.status(201).json({ 
            message: `PrestationArtisan créée avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR MODIFIER UNE PRESTA_ARTISAN
**********************************************************/
/*
    Fonction qui permet d'update le price d une presta dun artisan

    Les vérifications : 
        - l existance de l artisan
        - l existance de la prestation

*/
exports.updateAPrestaArtisan = async (req, res) => {
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
        if(!existingPresta) return res.status(404).json({message: 'La prestation n\'existe plys en base de donnés'});

        const existingPrestaArtisan = await PrestationArtisan.findOne({where:{
            id_artisan: artisan.id,
            id_prestation: existingPresta.id
        }});

        await existingPrestaArtisan.update({
            price: req.body.price,
        });

        res.status(201).json({ 
            message: `PrestationArtisan update avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/**********************************************************
            MÉTHODE POUR SUPRIMER UNE PRESTA_ARTISAN
**********************************************************/
/*
    Fonction qui permet de supprimer une presta d un artisan

    Les vérifications : 
        - l existance de l artisan
        - l existance de la prestation

*/
exports.deleteAPrestaArtisan = async (req, res) => {
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
        if(!existingPresta) return res.status(404).json({message: 'La prestation n\'existe plys en base de donnés'});


        const deletePresta = await PrestationArtisan.destroy({where: { 
            id_artisan: artisan.id,
            id_prestation: existingPresta.id
        }});
        
        if (!deletePresta) {
            return res.status(404).json({ message: 'PrestaArtisan non trouvé.' });
        }

        res.status(201).json({ message: 'PrestaArtisan supprimée avec succès.' });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};

/**********************************************************
            MÉTHODE POUR LISTER TOUTES LES PRESTA_ARTISAN
**********************************************************/
/*
    Fonction qui permet de lister les presta d un artisan

    Les vérifications : 
        - l existance de l artisan
        - l existance de la prestation

*/

exports.getAllPrestaArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { id: req.artisan.id} });
        if(!artisan){
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        const existingPrestaArtisan = await PrestationArtisan.findAll({where:{
            id_artisan: artisan.id
        }});
        if(!existingPrestaArtisan){
            return res.status(404).json({ message: 'PrestaArtisan non trouvé.'})
        }

        let prestaTab = [];

        for (let index = 0; index < existingPrestaArtisan.length; index++) {
            const presta = await Prestation.findOne({where: {
                id: existingPrestaArtisan[index].id_prestation
            }});

            if(!presta){
                return res.status(404).json({ message: 'Presta non trouvé.'});
            }

            if(presta.price != existingPrestaArtisan[index].price){
                presta.price = existingPrestaArtisan[index].price;
            }

            prestaTab.push(presta);
        }

        res.status(201).json(prestaTab);
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};
