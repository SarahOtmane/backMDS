const Job = require('../models/jobModel');


class JobController{
    /**********************************************************
            MÉTHODE POUR CREER UN JOB (ADMIN)
**********************************************************/
/*
    Fonction qui permet à l'admin de créer un job

    Les vérifications : 
        - l existance du job

*/
static async createAJob(req, res){
    try {
        const existingJob = await Job.findOne({ where: { name: req.body.name } });
        if (existingJob) {
            return res.status(401).json({ message: 'Ce job existe déjà.' });
        }

        await Job.create(req.body);

        res.status(201).json({message: `Job créé avec succès.`});
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR SUPPRIMER UN JOB (ADMIN)
**********************************************************/
/*
    Fonction qui permet de supprimer un job

    Les vérifications : 
        - Vérifier que le job existe

*/
static async deleteAJob(req, res){
    try {

        const deleteJob = await Job.destroy({
            where: { name: req.params.name_job }
        });
        
        if (!deleteJob) {
            return res.status(404).json({ message: 'Job non trouvé.' });
        }

        res.status(201).json({ message: 'Job supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};





/**********************************************************
            MÉTHODE POUR LISTER TOUS LES JOBS
**********************************************************/
/*
    Fonction qui permet de lister tous les jobs

    Les vérifications : 
        - Vérifier que les jobs existent

*/
static async getAllJobs(req, res){
    try {
        
        const jobs = await Job.findAll();
        
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'Aucun job trouvé.' });
        }

        res.status(201).json(jobs);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};
}

module.exports = JobController;