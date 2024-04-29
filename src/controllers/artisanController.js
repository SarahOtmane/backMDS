const Artisan = require('../models/artisanModel.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
import { verifyNumberPhone } from '../middlewares/functionsMiddleware.js';



/**********************************************************
            MÉTHODE POUR ENREGISTRER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet à une personne de créer un compte artisan

    Les vérifications : 
        - Vérifier que l'email n'existe pas dans la base de donnée
        - Vérifier que le role != admin

*/
exports.registerAnArtisan = async (req, res) => {
    try {
        const existingEmail = await Artisan.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(401).json({ message: 'Cet email existe déjà.' });
        }

        if (!verifyNumberPhone(req.body.mobile)) {
            return res.status(401).json({ message: 'Le numéro de téléphone est éronner'});
        }

        let newArtisan = await Artisan.create(req.body);

        res.status(201).json({ 
            message: `Artisan créé avec succès. L'email : ${newArtisan.email}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};