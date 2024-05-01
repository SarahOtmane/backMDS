const Commande = require('../models/commandeModel');


/**********************************************************
            MÉTHODE POUR CRÉER UNE COMMANDE
**********************************************************/
/*
    Fonction qui permet à un utilisateur de créer une commande
    
    Les vérifications : 
        - Vérifier que la chaine de caractère du champs picture correspond bien à une image
*/
exports.createCommande = async (req, res) => {
    try {
        let newCommande = await Commande.create(req.body);

        res.status(201).json({ message: `Commande enregistrée avec succès.` });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};