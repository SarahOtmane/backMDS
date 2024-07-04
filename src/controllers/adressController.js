const Adress = require('../models/adressModel');


/**********************************************************
            MÉTHODE POUR CREER UNE ADRESSE
**********************************************************/
/*
    Fonction qui permet de créer une adresse

    Les vérifications : 
        - l existance de l'adresse

*/
exports.createAnAdress = async (req, res) => {
    try {
        const existingAdress = await Adress.findOne({
            where: {
                streetAdress : req.body.streetAdress,
                city : req.body.city,
                postalCode : req.body.postalCode,
                country : req.body.country
            }
        });

        if(existingAdress){
            return res.status(401).json({ message: 'Cette adresse existe déjà.' });
        }
        await Adress.create(req.body);
        res.status(201).json({ 
            message: `Habit créé avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR CREER UNE ADRESSE
**********************************************************/
/*
    Fonction qui permet de créer une adresse

    Les vérifications : 
        - l existance de l'adresse

*/
exports.getAddress = async (req, res) => {
    try {
        const existingAdress = await Adress.findOne({where: {id: req.params.id_address}});
        if(!existingAdress){
            return res.status(401).json({ message: 'Cette adresse n\'existe pas.'});
        }

        res.status(200).json(existingAdress);
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};