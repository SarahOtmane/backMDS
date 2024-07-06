const Info = require('../models/infoModel.js');

class InfoController{

/**********************************************************
            MÉTHODE POUR CREER UNE INFO (ADMIN)
**********************************************************/
/*
    Fonction qui permet à l'admin de créer une info

    Les vérifications : 
        - l existance de l info

*/
static async createAnInfo(req, res){
    try {
        const existingInfo = await Info.findOne({ where: { name: req.body.name } });
        if (existingInfo) {
            return res.status(401).json({ message: 'Cette info existe déjà.' });
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
static async getAnInfo(req, res){
    try {
        const info = await Info.findOne({ where: { name: req.params.name_info } });

        if (!info) {
            return res.status(404).json({ message: 'Info non trouvé.' });
        }

        res.status(201).json(info);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR MODIFIER UNE INFO (ADMIN)
**********************************************************/
/*
    Fonction qui permet de modifier une info

    Les vérifications : 
        - Vérifier que l'info existe

*/
static async putAnInfo(req, res){
    try {
        const info = await Info.findOne({ where: { name: req.params.name_info } });

        if(!info){
            return res.status(404).json({ message: 'Information non trouvé.' });
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
            MÉTHODE POUR SUPPRIMER UNE INFO (ADMIN)
**********************************************************/
/*
    Fonction qui permet de supprimer une info

    Les vérifications : 
        - Vérifier que l'info existe

*/
static async deleteAnInfo(req, res){
    try {
        
        const deletedInfo = await Info.destroy({
            where: { name: req.params.name_info }
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

*/
static async getAllInfo(req, res){
    try {
        const infos = await Info.findAll();
        
        if (infos.length === 0) {
            return res.status(404).json({ message: 'Auncune information trouvée.' });
        }

        res.status(201).json(infos);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};
}


module.exports = InfoController;