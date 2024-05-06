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

        res.status(201).json({message: "Réparation créée avec succés."});

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
        const presta = await Prestation.findOne({ where: { id: req.params.id_prestation } });

        if (!presta) {
            return res.status(404).json({ message: 'Info non trouvé.' });
        }

        res.status(201).json(presta);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR MODIFIER UNE PRESTA (ADMIN)
**********************************************************/
/*
    Fonction qui permet de modifier une presta

    Les vérifications : 
        - Vérifier que la presta existe

*/
exports.putAPresta = async (req, res) => {
    try {
        const presta = await Prestation.findOne({ where: { id: req.params.id } });

        if(!presta){
            return res.status(404).json({ message: 'Prestation non trouvé.' });
        }

        await presta.update({ 
            categorie: req.body.categorie,
            clothType: req.body.clothType,
            reparationType: req.body.reparationType,
            priceSuggested: req.body.priceSuggested,
        });

        
        res.status(201).json({ message: 'Prestation mise à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR SUPPRIMER UNE PRESTA (ADMIN)
**********************************************************/
/*
    Fonction qui permet de supprimer une presta

    Les vérifications : 
        - Vérifier que la presta existe

*/
exports.deleteAPresta = async (req, res) => {
    try {
        
        const deletePresta = await Presta.destroy({
            where: { id: req.params.id }
        });
        
        if (!deletePresta) {
            return res.status(404).json({ message: 'Prestation non trouvé.' });
        }

        res.status(201).json({ message: 'Prestation supprimée avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR LISTER TOUTES LES PRESTA
**********************************************************/
/*
    Fonction qui permet de lister toutes les presta

    Les vérifications : 
        - Vérifier que les presta existent

*/
exports.getAllPresta = async (req, res) => {
    try {
        const prestas = await Prestation.findAll();
        
        if (!prestas) {
            return res.status(404).json({ message: 'Auncune prestation trouvée.' });
        }

        res.status(201).json(prestas);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};