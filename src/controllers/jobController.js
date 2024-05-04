const Job = require('../models/jobModel');


/**********************************************************
            MÉTHODE POUR CREER UN JOB
**********************************************************/
/*
    Fonction qui permet à l'admin de créer un job

    Les vérifications : 
        - l existance du job
        - role === admin

*/
exports.createAJob = async (req, res) => {
    try {
        const existingJob = await Job.findOne({ where: { name: req.body.name } });
        if (existingJob) {
            return res.status(401).json({ message: 'Ce job existe déjà.' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Vous n êtes pas admin, vous n avez pas l autorisation.'});
        }

        let newJob = await Job.create(req.body);

        res.status(201).json({ 
            message: `Utilisateur créé avec succès. L'email : ${newJob.name}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/**********************************************************
            MÉTHODE POUR LISTER UN JOB
**********************************************************/
/*
    Fonction qui permet de lister un job

    Les vérifications : 
        - Vérifier que le job existe

*/
exports.getAJob = async (req, res) => {
    try {
        const job = await Job.findOne({ where: { name: req.body.name } });

        if (!job) {
            return res.status(404).json({ message: 'Job non trouvé.' });
        }

        res.status(201).json(job);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR MODIFIER UN JOB
**********************************************************/
/*
    Fonction qui permet de modifier un job

    Les vérifications : 
        - Vérifier que le job existe
        - role === admin

*/
exports.putAJob = async (req, res) => {
    try {
        const job = await Job.findOne({ where: { name: req.body.name } });

        if(!job){
            return res.status(404).json({ message: 'Job non trouvé.' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Vous n êtes pas admin, vous n avez pas l autorisation.'});
        }

        await job.update({ 
            name: req.body.name,
        });

        
        res.status(201).json({ message: 'Job mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};