const Cloth = require('../models/clothModel');


/**********************************************************
            MÉTHODE POUR CREER UN CLOTH (ADMIN)
**********************************************************/
/*
    Fonction qui permet à l'admin de créer un cloth

    Les vérifications : 
        - l existance du cloth

*/
exports.createACloth = async (req, res) => {
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



/**********************************************************
            MÉTHODE POUR UPDATE UN CLOTH (ADMIN)
**********************************************************/
/*
    Fonction qui permet à l'admin de modifier un cloth

    Les vérifications : 
        - l existance du cloth

*/
exports.putACloth = async (req, res) => {
    try {
        const existingCloth = await Cloth.findOne({ where: { id: req.params.id_cloth } });
        if (!existingCloth) {
            return res.status(401).json({ message: 'Cet habit non trouvé.' });
        }

        await existingCloth.update({ 
            categorie: req.body.categorie,
            clothType: req.body.clothType,
            id_job: req.body.id_job
        });

        res.status(201).json({ message: 'Cloth mis à jour avec succès.' });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR SUPPRIMER UN CLOTH (ADMIN)
**********************************************************/
/*
    Fonction qui permet de supprimer un cloth

    Les vérifications : 
        - Vérifier que le cloth existe

*/
exports.deleteACloth = async (req, res) => {
    try {

        const deleteCloth = await Cloth.destroy({
            where: { id: req.params.id_cloth }
        });
        
        if (!deleteCloth) {
            return res.status(404).json({ message: 'Habit non trouvé.' });
        }

        res.status(201).json({ message: 'Habit supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR LISTER TOUS LES CLOTHES
**********************************************************/
/*
    Fonction qui permet de lister tous les clothes

    Les vérifications : 
        - Vérifier que les clothes existent

*/
exports.getAllClothes = async (req, res) => {
    try {
        
        const clothes = await Cloth.findAll();
        
        if (!clothes) {
            return res.status(404).json({ message: 'Auncun cloth trouvé.' });
        }

        res.status(201).json(clothes);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR LISTER TOUS LES CLOTHES D'UN JOB
**********************************************************/
/*
    Fonction qui permet de lister tous les clothes

    Les vérifications : 
        - Vérifier que les clothes existent

*/
exports.getAllClothesJob = async (req, res) => {
    try {
        
        const clothes = await Cloth.findAll({where: {id_job : req.params.id_job}});
        
        if (!clothes) {
            return res.status(404).json({ message: 'Auncun cloth trouvé.' });
        }

        res.status(201).json(clothes);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR RÉCUP LE NAME D'UN CLOTH
**********************************************************/
/*
    Fonction qui permet de lister un cloth

    Les vérifications : 
        - Vérifier que le cloth existe

*/
exports.getACloth = async (req, res) => {
    try {
        const cloth = await Cloth.findOne({ where: { id: req.params.id_cloth } });

        if (!cloth) {
            return res.status(404).json({ message: 'Habit non trouvé.' });
        }

        res.status(201).json(cloth);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};