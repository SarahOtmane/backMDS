const Info = require('../models/infoModel.js');


/**********************************************************
            MÉTHODE POUR CREER UNE INFO
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
            message: `Info créé avec succès. Le nom : ${newInfo.name}` 
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
        const info = await Info.findOne({ where: { name: req.params.name } });

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
        const info = await Info.findOne({ where: { name: req.params.name } });

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




/**********************************************************
            MÉTHODE POUR SUPPRIMER UNE INFO
**********************************************************/
/*
    Fonction qui permet de supprimer une info

    Les vérifications : 
        - Vérifier que l'info existe
        - role === admin

*/
exports.deleteAnInfo = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Vous n êtes pas admin, vous n avez pas l autorisation.'});
        }
        
        const deletedInfo = await Info.destroy({
            where: { name: req.params.name }
        });
        
        if (!deletedInfo) {
            return res.status(404).json({ message: 'Information non trouvé.' });
        }

        res.status(201).json({ message: 'Information supprimée avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR LISTER TOUTES LES INFO
**********************************************************/
/*
    Fonction qui permet de lister toutes les info

    Les vérifications : 
        - Vérifier que les info existent
        - role === admin

*/
exports.getAllInfo = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Vous n êtes pas admin, vous n avez pas l autorisation.'});
        }
        
        const infos = await Info.find();
        
        if (!infos) {
            return res.status(404).json({ message: 'Auncune information non trouvé.' });
        }

        res.status(201).json(infos);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};