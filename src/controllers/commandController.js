const Command = require('../models/commandModel');


/*****************************************************************
            MÉTHODE POUR LISTER TOUTES LES COMMANDES (ADMIN)
*****************************************************************/
/*
    Fonction qui permet de lister toutes les commandes

    Les vérifications : 
        - Vérifier que les commandes existent

*/
exports.getAllCommand = async (req, res) => {
    try {
        const commands = await Command.findAll();
        
        if (!commands) {
            return res.status(404).json({ message: 'Auncune commande trouvée.' });
        }

        res.status(201).json(commands);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/*****************************************************************
            MÉTHODE POUR LISTER TOUTES LES COMMANDES USER
*****************************************************************/
/*
    Fonction qui permet de lister toutes les commandes d'un user

    Les vérifications : 
        - Vérifier que les commandes existent

*/
exports.getCommandOfUser = async (req, res) => {
    try {
        const commands = await Command.findAll({where: {email_user: req.user.email}});
        
        if (!commands) {
            return res.status(404).json({ message: 'Auncune commande trouvée.' });
        }

        res.status(201).json(commands);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};