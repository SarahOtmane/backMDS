const Cloth = require('../models/clothModel');
const Job = require('../models/jobModel');


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
        const job = Job.findOne({where: {name: req.body.name_job}});
        if(!job){
            return res.status(400).json({error: "Job non trouvé"});
        }

        const existingCloth = await Cloth.findOne({ where: { 
            category: req.body.category,
            clothType: req.body.clothType,
            name_job: job.name
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

        const job = Job.findOne({where: {name: req.body.name_job}});
        if(!job){
            return res.status(400).json({error: "Job non trouvé"});
        }

        await existingCloth.update({ 
            category: req.body.category,
            clothType: req.body.clothType,
            name_job: req.body.name_job
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
exports.getAllClothesOfJob = async (req, res) => {
    try {

        const job = Job.findOne({where: {name: req.params.name_job}});
        if(!job){
            return res.status(400).json({error: "Job non trouvé"});
        }
        
        const clothes = await Cloth.findAll({where: {name_job : req.params.name_job}});
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