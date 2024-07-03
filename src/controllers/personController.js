const Person = require('../models/personModel.js');
const Adress = require('../models/adressModel.js');
const Artisan = require('../models/artisanModel.js');

const jwt = require('jsonwebtoken');
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

        if (req.body.role === 'artisan') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un utilisateur avec le rôle artisan.'});
        }

        let id_address = null;

        //si l'utilisateur a renseigner son adresse
        if( req.body.city && req.body.city && req.body.postalCodé && req.body.country){
            const existingAdress = await Adress.findOne({where: {
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
            }});

            if (! existingAdress){
                const adress = await Adress.create({
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    postalCode: req.body.postalCode,
                    country: req.body.country,
                });
    
                id_address = adress.id;
            }else{
                id_address = existingAdress.id;
            }
        }

        const password = await argon2.hash(req.body.password);

        await Person.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            role: 'user',
            mobile: req.body.mobile,
            subscribeNewsletter: false,
            id_address : id_address
        });

        res.status(201).json({ message: `Utilisateur créé avec succès.`});
    } 
    catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
};




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
        const existingEmail = await Person.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        if (req.body.role === 'admin') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un artisan avec le rôle admin.'});
        }

        if (req.body.role === 'user') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un artisan avec le rôle user.'});
        }

        const existingAdress = await Adress.findOne({where: {
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
        }});
        let id_address = existingAdress.id;

        if (! existingAdress){
            const adress = await Adress.create({
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
            });

            id_address = adress.id;
        }

        const password = await argon2.hash(req.body.password);

        let newArtisanDetails = await Artisan.create({
            acceptNewOrder: true,
            siret: req.body.siret,
            tva: req.body.tva,
            name_job: name_job
        });

        let newArtisan = await Person.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            role: 'user',
            mobile: req.body.mobile,
            subscribeNewsletter: false,
            id_address : id_address,
            id_artisan : newArtisanDetails.id,
        });

        res.status(201).json({ message: `Artisan créé avec succès.`});
    } 
    catch (error) {
            console.error('Erreur lors de la création de l\'artisan:', error);
    }
};





/**********************************************************
            MÉTHODE POUR CONNECTER UNE PERSONNE
**********************************************************/
/*
    Fonction qui permet à une personne de se connecter à son compte user

    Les vérifications : 
        - Vérifier que le compte associé à l'email existe
        - Vérifier que le mot de passe est bon

*/
exports.loginAPerson = async (req, res) => {
    try {
        const person = await Person.findOne({ where: { email: req.body.email } });

        if (!person) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const validPassword = await argon2.compare(req.body.password, user.password);

        if (validPassword) {
            const userData = {
                email: user.email,
                role: user.role
            };
          
            const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30d" });

            res.status(201).json({ token });

        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};