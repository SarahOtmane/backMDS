const Prestation = require('../models/prestationModel');


/**********************************************************
            MÉTHODE POUR CREER UNE PRESTATION (ADMIN)
**********************************************************/
/*
    Fonction qui permet à l'admin de créer une presta

    Les vérifications : 
        - la prestation en question existe pas en bdd

*/
exports.createAPrestation = async(req, res) =>{
    try {
        let presta = await Prestation.findOne({
            where: {
                categorie: req.body.categorie,
                clothType: req.body.clothType,
                reparationType: req.body.reparationType,
                priceSuggested: req.body.priceSuggested
            }
        })

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}




/**********************************************************
            MÉTHODE POUR LISTER UNE PRESTATION
**********************************************************/
/*
    Fonction qui permet de lister une prestation

    Les vérifications : 
        - Vérifier que la prestation existe

*/
exports.getAPrestation = async (req, res) => {
    try {
        const presta = await Prestation.findOne({ where: { id: req.params.id } });

        if (!presta) {
            return res.status(404).json({ message: 'Info non trouvé.' });
        }

        res.status(201).json(presta);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};