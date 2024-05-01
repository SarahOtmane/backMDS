const Commande = require('../models/commandeModel');
const Reparation = require('../models/reparationModel');
const User = require('../models/userModel');
const Place = require('../models/placeModel');
const DetailUser = require('../models/detailsUserModel');


/**********************************************************
            MÉTHODE POUR CRÉER UNE COMMANDE
**********************************************************/
/*
    Fonction qui permet à un utilisateur de créer une commande
    
    Les infos attendu dans le body :
        - name / picture / finished
        - categorie / colthType / reparationType => déduire id_reparation
    
    Les vérifications : 
        - Vérifier que la chaine de caractère du champs picture correspond bien à une image
        - Vérifier que l'id réparation correspondant existe
*/
exports.createCommande = async (req, res) => {
    try {
        // Trouver l'utilisateur à partir de l'adresse e-mail
        const user = await User.findOne({ where: { email: req.body.email_user } });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        //Récupérer les détails des infos du user
        const details = await DetailUser.findOne({where: {id: user.id_details}})
        if (!details) {
            return res.status(404).json({ message: "Les information de l'utilisateur n'existent pas." });
        }

        //Récupérer les infos de l'adresse
        const adresse = await Place.findOne({where: {id: details.id_place}});
        if (!adresse) {
            return res.status(404).json({ message: "L'adresse de l'utilisateur n'existe pas." });
        }


        let reparation = await Reparation.findOne({ 
            where: { 
                categorie: req.body.categorie,
                clothType: req.body.clothType,
                reparationType : req.body.reparationType
            } 
        });

        if(!reparation){
            return res.status(404).json({ message: "Type de répa inexistant" });
        }

        //assigner un artisan à la commande


        let newCommande = await Commande.create({
            name: req.body.name,
            picture: req.body.picture,
            finished: false,
            id_reparation: reparation.id,
            email_user: req.user.email,
        });

        res.status(201).json({ message: `Commande enregistrée avec succès.` });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};