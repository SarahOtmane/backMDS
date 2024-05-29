const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


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
        const existingEmail = await User.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        if (req.body.role === 'admin') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un utilisateur avec le rôle admin.'});
        }

        let password = await bcrypt.hash(req.body.password, 10);

        let newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            role: 'user',
            mobile: req.body.mobile,
            streetAdress: req.body.streetAdress,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
            subscribeNewsletter: false,
        });

        res.status(201).json({ 
            message: `Utilisateur créé avec succès. L'email : ${newUser.email}` 
        });
    } 
    catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error); // Ajout de cette ligne pour plus de détails
            res.status(500).json({error: error.message}); // Modification pour inclure le message d'erreur
    }
};


/**********************************************************
            MÉTHODE POUR CONNECTER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet à une personne de se connecter à son compte user

    Les vérifications : 
        - Vérifier que le compte associé à l'email existe
        - Vérifier que le mot de passe est bon

*/
exports.loginAUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (validPassword) {
            const userData = {
                id: user.id,
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


/**********************************************************
            MÉTHODE POUR LISTER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet de lister les informations d'un utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.getAUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR MODIFIER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet de modifier les info d'un utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.putAUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });

        if(!user){
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!validPassword){
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        password = await bcrypt.hash(req.body.password, 10);

        await user.update({ 
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: password,
            mobile: req.body.mobile,
            subscribeNewsletter: req.body.subscribeNewsletter,
            streetAdress: req.body.streetAdress,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode
        });

        
        res.status(201).json({ message: 'Utilisateur mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR SUPPRIMER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet de supprimer un compte utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.deleteAUser = async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: { id: req.user.id }
        });
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(201).json({ message: 'Utilisateur supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/**********************************************************
            MÉTHODE POUR LISTER TOUS LES USERS (ADMIN)
**********************************************************/
/*
    Fonction qui permet de lister tous les users

    Les vérifications : 
        - Vérifier que les users existent

*/
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        
        if (!users) {
            return res.status(404).json({ message: 'Auncun utilisateur trouvé.' });
        }

        res.status(201).json(users);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};