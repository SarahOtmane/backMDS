const User = require('../models/userModel.js');



/**********************************************************
            MÉTHODE POUR ENREGISTRER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet à une personne de créer un compte user

    Les vérifications : 
        - Vérifier que l'email n'existe pas dans la base de donnée
        - Varifier que le role != admin

*/
exports.registerAUser = async (req, res) => {
    try {
        const existingEmail = await User.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(401).json({ message: 'Cet email existe déjà.' });
        }

        if (req.body.role === 'admin') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un utilisateur avec le rôle admin.'});
        }

        let newUser = await User.create(req.body);

        res.status(201).json({ 
            message: `Utilisateur n°${newUser.id_user} créé avec succès. L'email : ${newUser.email}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};