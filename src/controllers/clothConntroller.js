const Cloth = require('../models/clothModel');


/**********************************************************
            MÉTHODE POUR CREER UN CLOTH (ADMIN)
**********************************************************/
/*
    Fonction qui permet à l'admin de créer un cloth

    Les vérifications : 
        - l existance du cloth

*/
exports.createAJob = async (req, res) => {
    try {
        const existingCloth = await Cloth.findOne({ where: { 
            categorie: req.body.categorie,
            clothType: req.body.clothType,
            id_job: req.body.id_job
        } });
        if (existingCloth) {
            return res.status(401).json({ message: 'Cet habit existe déjà.' });
        }

        await Cloth.create(req.body);

        res.status(201).json({ 
            message: `Habit créé avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};