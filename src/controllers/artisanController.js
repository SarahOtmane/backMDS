const Artisan = require('../models/artisanModel.js');
const Job = require('../models/jobModel.js');
const Prestation = require('../models/prestationModel.js');
const Product = require('../models/productModel.js');
const functionsMiddleware = require('../middlewares/functionsMiddleware.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/************************************************************************
            MÉTHODE POUR CRER UN COMPTE ARTISAN
************************************************************************/
/*
    Fonction qui permet à une personne de créer un compte artisan

    Les vérifications : 
        - Vérifier que l'email n'existe pas dans la base de donnée
        - Vérifier que l'email est au bon format
        - Verifier que le num est au bon format

*/
exports.registerAnArtisan = async (req, res) => {
    try {
        // Vérification de l'email existant
        const existingEmail = await Artisan.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        // Vérification de l'existence du métier
        const existingJob = await Job.findOne({ where: { name: req.body.job } });
        if (!existingJob) {
            return res.status(401).json({ message: 'Ce métier n\'existe pas' });
        }

        // Vérification du format de l'email
        if (!functionsMiddleware.verifyEmail(req.body.email)) {
            return res.status(401).json({ message: 'L\'email n\'est pas au bon format' });
        }

        // Vérification des prestations
        let prestations = req.body.prestations;
        if (!prestations || prestations.length === 0) {
            return res.status(404).json({ message: 'Aucune prestation enregistrée' });
        }

        // Hachage du mot de passe
        let password = await bcrypt.hash(req.body.password, 10);

        // Création du compte artisan
        let newArtisan = await Artisan.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            mobile: req.body.mobile,
            streetAdress: req.body.streetAdress,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
            acceptNewOrder: true,
            id_job: existingJob.id,
            siret: req.body.siret,
            numeroTVA: req.body.numeroTVA
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

        // Réponse finale
        res.status(201).json({ newArtisan, products });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du traitement des données.", error: error.message });
    }
};





/************************************************************************
            MÉTHODE POUR SE CONNECTER A UN COMPTE ARTISAN
************************************************************************/
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

        const validPassword = await bcrypt.compare(req.body.password, artisan.password);

        if (validPassword) {
            const artisanData = {
                id: artisan.id,
                email: artisan.email
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





/************************************************************************
            MÉTHODE POUR LISTER LES INFO DU COMPTE ARTISAN CONNECTE
************************************************************************/
/*
    Fonction qui permet de lister les informations du compte connecté

    Les vérifications : 
        - Vérifier que l'artisan existe

*/
exports.getAnArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { id: req.artisan.id} });

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        res.status(201).json(artisan);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};





/************************************************************************
            MÉTHODE POUR MODIFIER LES INFO DE SON COMPTE ARTISAN
************************************************************************/
/*
    Fonction qui permet de modifier les info de son compte artisan

    Les vérifications : 
        - Vérifier que l'artisan existe

*/
exports.putAnArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { id: req.artisan.id} });
        if(!artisan){
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        console.log(artisan);

        const existingJob = await Job.findOne({where: {id: req.body.id_job}});
        if (!existingJob) {
            return res.status(401).json({ message: 'Ce métier n\'existe pas'})
        }

        let password = await bcrypt.hash(req.body.password, 10);

        await artisan.update({ 
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: password,
            mobile: req.body.mobile,
            id_job: req.body.id_job,
            acceptNewOrder: req.body.acceptNewOrder,
            streetAdress: req.body.streetAdress,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode,
            id_job: existingJob.id,
        });

        res.status(201).json({ message: 'Artisan mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données." });
    }
};





/************************************************************************
            MÉTHODE POUR SUPPRIMER SON COMPTE ARTISAN
************************************************************************/
/*
    Fonction qui permet de supprimer son compte artisan

    Les vérifications : 
        - Vérifier que l'artisan existe

*/
exports.deleteAnArtisan = async (req, res) => {
    try {
        const deletedArtisan = await Artisan.destroy({
            where: { id: req.artisan.id }
        });
        
        if (!deletedArtisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        res.status(201).json({ message: 'Artisan supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/************************************************************************
            MÉTHODE POUR LISTER TOUS LES ARTISANS EN BDD
************************************************************************/
/*
    Fonction qui permet de lister tous les artisans

    Les vérifications : 
        - Vérifier que les artisans existent

*/
exports.getAllArtisans = async (req, res) => {
    try {
        const artisans = await Artisan.findAll();
        
        if (!artisans) {
            return res.status(404).json({ message: 'Aucun artisans trouvé.' });
        }

        res.status(201).json(artisans);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/************************************************************************
            MÉTHODE POUR LISTER TOUS LES ARTISANS (id_job, postalCode)
************************************************************************//*
    Fonction qui permet de lister tous les artisans

    Les vérifications : 
        - Vérifier que les artisans existent

*/
exports.getAllArtisansFiltre = async (req, res) => {
    try {
        if(req.params.id_job === '-1'){
            const artisans = await Artisan.findAll({where: {
                postalCode: req.params.postalcode
            }});

            if (!artisans) {
                return res.status(404).json({ message: 'Aucun artisans trouvé.' });
            }
    
            return res.status(201).json(artisans);
        }else if(req.params.postalcode === '-1'){
            const artisans = await Artisan.findAll({where: {
                id_job: req.params.id_job
            }});

            if (!artisans) {
                return res.status(404).json({ message: 'Aucun artisans trouvé.' });
            }
    
            return res.status(201).json(artisans);
        }

        const artisans = await Artisan.findAll({where: {
            id_job: req.params.id_job,
            postalCode: req.params.postalcode
        }});

        if (!artisans) {
            return res.status(404).json({ message: 'Aucun artisans trouvé.' });
        }

        return res.status(201).json(artisans);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};