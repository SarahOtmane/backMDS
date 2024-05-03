const Info = require('../models/infoModel.js');


/**********************************************************
            MÉTHODE POUR CREER DES INFO
**********************************************************/
/*
    Fonction qui permet à l'admin de créer une info

    Les vérifications : 
        - l existance de l info
        - role === admin

*/
exports.createAnInfo = async (req, res) => {
    try {
        const existingInfo = await Info.findOne({ where: { name: req.body.name } });
        if (existingInfo) {
            return res.status(401).json({ message: 'Cette info existe déjà.' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Vous n êtes pas admin, vous n avez pas l autorisation.'});
        }

        let newInfo = await Info.create(req.body);

        res.status(201).json({ 
            message: `Utilisateur créé avec succès. L'email : ${newInfo.name}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR LISTER UNE INFO
**********************************************************/
/*
    Fonction qui permet de lister une info

    Les vérifications : 
        - Vérifier que l'info existe

*/
exports.getAnInfo = async (req, res) => {
    try {
        const info = await Info.findOne({ where: { name: req.body.name } });

        if (!info) {
            return res.status(404).json({ message: 'Info non trouvé.' });
        }

        res.status(201).json(info);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR MODIFIER UNE INFO
**********************************************************/
/*
    Fonction qui permet de modifier une info

    Les vérifications : 
        - Vérifier que l'info existe
        - role === admin

*/
exports.putAnInfo = async (req, res) => {
    try {
        const info = await Info.findOne({ where: { email: req.body.email } });

        if(!info){
            return res.status(404).json({ message: 'Information non trouvé.' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Vous n êtes pas admin, vous n avez pas l autorisation.'});
        }

        await info.update({ 
            name: req.body.name,
            content: req.body.content,
        });

        
        res.status(201).json({ message: 'Information mise à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};
