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





/**********************************************************
            MÉTHODE POUR CONNECTER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet à une personne de se connecter à son compte artisan

    Les vérifications : 
        - Vérifier que le compte associé à l'email existe
        - Vérifier que le mot de passe est bon

*/
exports.loginAnArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { email: req.body.email } });

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        // const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (artisan.password === req.body.password) {
            const artisanData = {
                email: artisan.email,
                role: artisan.role
            };
          
            const token = jwt.sign(artisanData, process.env.JWT_KEY, { expiresIn: "30d" });

            res.status(201).json({ token });

        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};