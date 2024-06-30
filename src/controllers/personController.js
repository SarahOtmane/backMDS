const Person = require('../models/personModel.js');
const Adress = require('../models/adressModel.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');


/**********************************************************
            MÉTHODE POUR ENREGISTRER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet à une personne de créer un compte user

    Les vérifications : 
        - Vérifier que l'email n'existe pas dans la base de donnée
        - Vérifier que le role != admin

*/


exports.registerAUser = async (req, res) => {
    try {
        const existingEmail = await Person.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        if (req.body.role === 'admin') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un utilisateur avec le rôle admin.'});
        }

        const existingAdress = await Adress.findOne({where: {
            streetAdress: req.body.streetAdress,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
        }});

        if (! existingAdress){
            const adress = await Adress.create({
                streetAdress: req.body.streetAdress,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
            });

            console.log(adress)
        }


        // const password = await argon2.hash(req.body.password);

        // let newUser = await User.create({
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname,
        //     email: req.body.email,
        //     password: password,
        //     role: 'user',
        //     mobile: req.body.mobile,
        //     subscribeNewsletter: false,
        // });

        res.status(201).json({ 
            message: `Utilisateur créé avec succès. L'email :` 
        });
    } 
    catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
};
