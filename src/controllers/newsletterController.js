const Newsletter = require("../models/newsletterModel");
const Person = require('../models/personModel');

/**********************************************************
            MÉTHODE POUR SE CONNECTER A LA NEWSLETTER
**********************************************************/
/*
    Fonction qui permet à l'admin de créer un job

    Les vérifications : 
        - Verifier si l email est associé a un compte
        - Verifier que l email n'a pas déja ete inscrit a la news

*/
exports.addInNewsletter = async (req, res) => {
    try {
        const person = await Person.findOne({where: {email: req.body.email}});
        if(person){
            person.subscribeNewsletter = true;
            await person.save();
            return res.status(201).json({message: "Vous êtes inscrit à la newsletter"});
        }

        const emailExisting = await Newsletter.findOne({where: {email: req.body.email}});
        if(emailExisting){
            return res.status(401).json({message: "Cet email est inscrit à la newsletter"});
        }

        await Newsletter.create({email: req.body.email});
        res.status(201).json({message: "Vous êtes inscrit à la newsletter"});

    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/************************************************************************
            MÉTHODE POUR LISTER LES EMAILS INSCRITS A LA NEWSLETTER
************************************************************************/
/*
    Fonction qui permet à l'admin de créer un job

    Les vérifications : 
        - Verifier si l email est associé a un compte
        - Verifier que l email n'a pas déja ete inscrit a la news

*/
exports.getAllInNewsletter = async (req, res) => {
    try {
        const personInscrits = await Person.findAll({where: {subscribeNewsletter: true}});
        const emailsInscrits = await Newsletter.findAll();

        if(personInscrits.length===0 && emailsInscrits.length===0){
            return res.status(404).json({message: "Aucun email n'est inscrit à la newsletter"});
        }

        res.status(201).json({personInscrits, emailsInscrits});
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};