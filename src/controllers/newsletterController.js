const Newsletter = require("../models/newsletterModel");
const User = require('../models/userModel');

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
        const user = await User.findOne({where: {email: req.body.email}});
        if(user){
            user.subscribeNewsletter = true;
            await user.save();
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
        const userInscrits = await User.findAll({where: {subscribeNewsletter: true}});
        const emailsInscrits = await Newsletter.findAll();

        if(!userInscrits && !emailsInscrits){
            return res.status(404).json({message: "Aucun email n'est inscrit à la newsletter"});
        }

        res.status(201).json({userInscrits, emailsInscrits});
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};