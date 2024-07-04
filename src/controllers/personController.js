const Person = require('../models/personModel.js');
const Address = require('../models/adressModel.js');
const Artisan = require('../models/artisanModel.js');
const Job = require('../models/jobModel.js');
const Prestation = require('../models/prestationModel.js');
const Product = require('../models/productModel.js');

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

        const { email, role, streetAddress, city, postalCode, country, password, firstname, lastname, mobile } = req.body;

        // Vérification de l'existence de l'email
        const existingEmail = await Person.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        // Vérification du rôle
        if (role === 'admin' || role === 'artisan') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un utilisateur avec ce rôle.' });
        }

        let id_address = null;

        // Si l'utilisateur a renseigné son adresse
        if (streetAddress && city && postalCode && country) {
            const existingAddress = await Address.findOne({
                where: { streetAddress, city, postalCode, country }
            });

            if (!existingAddress) {
                const newAddress = await Address.create({ streetAddress, city, postalCode, country });
                id_address = newAddress.id;
            } else {
                id_address = existingAddress.id;
            }
        }

        // Hachage du mot de passe
        const hashedPassword = await argon2.hash(password);

        // Création de l'utilisateur
        await Person.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role: 'user',
            mobile,
            subscribeNewsletter: false,
            id_address
        });

        res.status(201).json({ message: `Utilisateur créé avec succès.`});
    } 
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
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
        const { 
            email, role, streetAddress, city, postalCode, 
            country, password, firstname, lastname, mobile, 
            siret, tva, name_job, prestations
        } = req.body;

        // Vérification de l'existence de l'email
        const existingEmail = await Person.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        // Vérification du rôle
        if (role === 'admin' || role === 'user') {
            return res.status(401).json({ message: `Vous ne pouvez pas créer un artisan avec le rôle ${role}.` });
        }

        // Vérification de l'existence du métier
        const existingJob = await Job.findOne({ where: { name: name_job  } });
        if (!existingJob) {
            return res.status(401).json({ message: 'Ce métier n\'existe pas' });
        }

        if (!prestations || prestations.length === 0) {
            return res.status(404).json({ message: 'Aucune prestation enregistrée' });
        }

        // Vérification de l'adresse existante
        let id_address = null;
        const existingAddress = await Address.findOne({
            where: { streetAddress, city, postalCode, country }
        });

        if (existingAddress) {
            id_address = existingAddress.id;
        } else {
            const newAddress = await Address.create({ streetAddress, city, postalCode, country });
            id_address = newAddress.id;
        }

        // Hachage du mot de passe
        const hashedPassword = await argon2.hash(password);

        // Création des détails de l'artisan
        const newArtisanDetails = await Artisan.create({
            acceptNewOrder: true,
            siret,
            tva,
            name_job
        });

        // Création de l'utilisateur artisan
        const newArtisan = await Person.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role: 'artisan',
            mobile,
            subscribeNewsletter: false,
            id_address,
            id_artisan: newArtisanDetails.id
        });

        // Création des produits associés aux prestations
        let products = [];
        for (let index = 0; index < prestations.length; index++) {
            const prestaType = prestations[index];

            const existingPresta = await Prestation.findOne({ where: { reparationType: prestaType } });
            if (existingPresta) {
                let newProduct = await Product.create({
                    price: existingPresta.priceSuggested,
                    id_prestation: existingPresta.id,
                    id_artisan: newArtisan.id
                });
                products.push(newProduct);
            } else {
                return res.status(404).json({ message: `La prestation ${prestaType} n'existe pas` });
            }
        }

        res.status(201).json({ message: `Artisan créé avec succès.`});
    } 
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'artisan.' });
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

        const validPassword = await argon2.verify(person.password, req.body.password);

        if (validPassword) {
            const personData = {
                email: person.email,
                role: person.role
            };

            const token = jwt.sign(personData, process.env.JWT_KEY, { expiresIn: "30d" });

            return res.status(200).json({ token });

        } else {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        return res.status(500).json({ message: 'Erreur lors du chargement des données.' });
    }
};


/**********************************************************************
            MÉTHODE POUR LISTER LES INFORMATIONS D'UN UTILISATEUR
**********************************************************************/
/*
    Fonction qui permet de lister les informations d'un utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.getAUser = async (req, res) => {
    try {
        const user = await Person.findOne({ where: { email: req.user.email } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        let userResponse = user.toJSON(); 

        if(user.id_address !== null){
            const address = await Address.findOne({ where: { id: user.id_address } });
            userResponse.address = address;
        }

        res.status(200).json(userResponse);

    } catch (error) {
        console.error('Erreur lors du traitement des données:', error);
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************************
            MÉTHODE POUR LISTER LES INFORMATIONS D'UN ARTISAN
**********************************************************************/
/*
    Fonction qui permet de lister les informations d'un utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.getAnArtisan = async (req, res) => {
    try {
        const artisan = await Person.findOne({ where: { email: req.artisan.email } });

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }
            
        let artisanResponse = artisan.toJSON();
        const address = await Address.findOne({ where: { id: artisan.id_address } });
        artisanResponse.address = address;

        const details = await Artisan.findOne({where: {id: artisan.id}});
        artisanResponse.details = details;

        res.status(200).json(artisanResponse);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/**********************************************************************
            MÉTHODE POUR MODIFIER LES INFORMATIONS D'UN USER
**********************************************************************/
/*
    Fonction qui permet de lister les informations d'un utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.updateDetailsUser = async (req, res) => {
    try {
        const user = await Person.findOne({ where: { email: req.user.email } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
            


        res.status(200).json(artisan);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};