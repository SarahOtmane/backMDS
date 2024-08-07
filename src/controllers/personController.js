const Person = require('../models/personModel.js');
const Address = require('../models/adressModel.js');
const Artisan = require('../models/artisanModel.js');
const Job = require('../models/jobModel.js');
const Prestation = require('../models/prestationModel.js');
const Product = require('../models/productModel.js');

const jwt = require('jsonwebtoken');
const argon2 = require('argon2');


class PersonController{
    /**********************************************************
            MÉTHODE POUR ENREGISTRER UN UTILISATEUR
    **********************************************************/
    /*
        Fonction qui permet à une personne de créer un compte user

        Les vérifications : 
            - Vérifier que l'email n'existe pas dans la base de donnée
            - Vérifier que le role != admin

    */
    static async registerAUser(req, res){
    try {
        const { email, role, password, firstname, lastname, mobile } = req.body;

        // Check for missing fields
        if (!email || !password || !firstname || !lastname || !mobile) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Format d\'email invalide.' });
        }

        // Vérification de l'existence de l'email
        const existingEmail = await Person.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        // Vérification du rôle
        if (role === 'admin' || role === 'artisan') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un utilisateur avec ce rôle.' });
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
            id_address : null
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
    static async registerAnArtisan(req, res){
        try {
            const { email, role, streetAddress, city, postalCode, country, password, firstname, lastname, mobile, siret, tva, job, prestations } = req.body;
    
            // Check for missing fields
            if (!email || !password || !firstname || !lastname || !mobile || !streetAddress || !city || !postalCode || !country || !siret || !tva || !job || !prestations) {
                return res.status(400).json({ message: 'Tous les champs sont requis.' });
            }
    
            // Vérification de l'existence de l'email
            const existingEmail = await Person.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(409).json({ message: 'Cet email existe déjà.' });
            }
    
            // Vérification du rôle
            if (role !== undefined && (role === 'admin' || role === 'user')) {
                return res.status(401).json({ message: `Vous ne pouvez pas créer un artisan avec le rôle ${role}.` });
            }
    
            // Vérification de l'existence du métier
            const existingJob = await Job.findOne({ where: { name: job } });
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
                name_job : job,
                description : '',
                picture : ''
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
                        id_artisan: newArtisanDetails.id
                    });
                products.push(newProduct);

                } else {
                    return res.status(404).json({ message: 'La prestation ${prestaType} nexiste pas' });
                }
            }    
            res.status(201).json({ message: `Artisan créé avec succès.` });
        } 
        catch (error) {
            console.error('Erreur lors de la création de l\'artisan:', error);
            res.status(500).json({ message: 'Erreur lors de la création de l\'artisan.' });
        }
    }


    
    /**********************************************************
                MÉTHODE POUR CONNECTER UNE PERSONNE
    **********************************************************/
    /*
        Fonction qui permet à une personne de se connecter à son compte user

        Les vérifications : 
            - Vérifier que le compte associé à l'email existe
            - Vérifier que le mot de passe est bon

    */
    static async loginAPerson(req, res){
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
    static async getAUser(req, res){
        try {
            const user = await Person.findOne({ where: { email: req.user.email } });

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
    static async getAnArtisan(req, res){
        try {
            const artisan = await Person.findOne({ where: { email: req.artisan.email } });
            if (!artisan) {
                return res.status(404).json({ message: 'Artisan non trouvé.' });
            }

            let artisanResponse = artisan.toJSON();
            const address = await Address.findOne({ where: { id: artisan.id_address } });
            artisanResponse.address = address;

            const details = await Artisan.findOne({where: {id: artisan.id_artisan}});
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
    static async updateDetailsPerson(req, res){
        try {
            let person;
            if(req.user === undefined) person = req.artisan;
            else person = req.user;
    
            person = await Person.findOne({ where: { email: person.email } });
    
            const { firstname, lastname, mobile, streetAddress, postalCode, country, city, id_address } = req.body;
    
            // Check for missing fields
            if (!firstname || !lastname || !mobile) {
                return res.status(400).json({ message: 'Tous les champs sont requis.' });
            }
    
            let newIdAdress = id_address;
            if(streetAddress !== undefined && postalCode !== undefined && country !== undefined && city !== undefined){
                const existingAddress = await Address.findOne({
                    where: { 
                        streetAddress : streetAddress, 
                        city : city, 
                        postalCode : postalCode, 
                        country : country 
                    }
                });
    
                if (existingAddress) {
                    newIdAdress = existingAddress.id;
                } else {
                    const newAddress = await Address.create({ streetAddress, city, postalCode, country });
                    newIdAdress = newAddress.id;
                }
            }
    
            await person.update({
                lastname, firstname,
                mobile, id_address : newIdAdress
            });
    
            res.status(200).json(person);
    
        } catch (error) {
            res.status(500).json({ message: "Erreur lors du traitement des données." });
        }
    }



    /**********************************************************************
                MÉTHODE POUR MODIFIER LES INFORMATIONS D'UN USER
    **********************************************************************/
    /*
        Fonction qui permet de lister les informations d'un utilisateur

        Les vérifications : 
            - Vérifier que l'utilisateur existe

    */
    static async updatePassword(req, res){
        try {
            let person; 
        
            if(req.user === undefined) person = req.artisan;
            else person = req.user;
        
            const userUpdate = await Person.findOne({ where: { email: person.email } });
            if(!userUpdate){
                return res.status(404).json({ message: 'Personne non trouvée.' });
            }
        
            const { oldPassword, password } = req.body;
        
            // Check for missing fields
            if (!oldPassword || !password) {
                return res.status(400).json({ message: 'Tous les champs sont requis.' });
            }
        
            // Check if old and new passwords are the same
            if (oldPassword === password) {
                return res.status(400).json({ message: 'Le nouveau mot de passe ne peut pas être identique à l\'ancien mot de passe.' });
            }
        
            const validPassword = await argon2.verify(userUpdate.password, oldPassword);
            if(!validPassword){
                return res.status(400).json({ message: 'Mot de passe incorrect.' });
            }
        
            const hashedPassword = await argon2.hash(password);
        
            await userUpdate.update({ 
                password: hashedPassword,
            });
            res.status(201).json({ message: 'Personne mise à jour avec succès.' });
        
        } catch (error) {
            res.status(500).json({ message: "Erreur lors du traitement des données." });
        }
}

}

module.exports = PersonController;





