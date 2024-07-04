const Artisan = require('../models/artisanModel');
const Command = require('../models/commandModel');
const Product = require('../models/productModel');


/*****************************************************************
            MÉTHODE POUR LISTER TOUTES LES COMMANDES (ADMIN)
*****************************************************************/
/*
    Fonction qui permet de lister toutes les commandes

    Les vérifications : 
        - Vérifier que les commandes existent

*/
exports.getAllCommand = async (req, res) => {
    try {
        const commands = await Command.findAll();
        
        if (!commands) {
            return res.status(404).json({ message: 'Auncune commande trouvée.' });
        }

        res.status(201).json(commands);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/*****************************************************************
            MÉTHODE POUR LISTER TOUTES LES COMMANDES USER
*****************************************************************/
/*
    Fonction qui permet de lister toutes les commandes d'un user

    Les vérifications : 
        - Vérifier que les commandes existent

*/
exports.getCommandOfUser = async (req, res) => {
    try {
        const commands = await Command.findAll({where: {email_user: req.user.email}});
        
        if (!commands) {
            return res.status(404).json({ message: 'Auncune commande trouvée.' });
        }

        res.status(201).json(commands);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/*****************************************************************
            MÉTHODE POUR LISTER TOUTES LES COMMANDES ARTISAN
*****************************************************************/
/*
    Fonction qui permet de lister toutes les commandes d'un artisan

    Les vérifications : 
        - Vérifier que les commandes existent

*/
exports.getCommandOfArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({where: {email: req.artisan.email}});
        const products = await Product.findAll({ where: { id_artisan: artisan.id } });
        if (!products.length) {
            return res.status(404).json({ message: 'Aucun produit pour cet artisan.' });
        }

        let commands = [];

        for (let product of products) {
            const productCommands = await Command.findAll({ where: { id_product: product.id } });
            if (productCommands.length) {
                commands = commands.concat(productCommands);
            }
        }

        res.status(200).json(commands);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du traitement des données." });
    }
};