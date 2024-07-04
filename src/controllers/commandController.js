const Artisan = require('../models/artisanModel');
const Command = require('../models/commandModel');
const Product = require('../models/productModel');



/**********************************************************
            MÉTHODE POUR CREER UNE COMMANDE
**********************************************************/
/*
    Fonction qui permet à un user de créer une commande

    Les vérifications : 
        - l existance de l artisan
        - l existance de la prestation

*/
exports.createACommand = async (req, res) => {
    try {
        const existingArtisan = await Artisan.findOne({ where: { id: req.params.id_artisan } });
        if (!existingArtisan) {
            return res.status(404).json({ message: 'L\'artisan n\'existe plus en base de données.' });
        }

        const existingCloth = await Cloth.findOne({where: {
            category: req.body.category,
            clothType: req.body.clothType,
            id_job: req.body.id_job
        }})
        if(!existingCloth) return res.status(404).json({message: 'L\'habit n\'existe plus en base de donnés'});

        const existingPresta = await Prestation.findOne({where: {reparationType: req.body.reparationType}});
        if(!existingPresta) return res.status(404).json({message: 'La prestation n\'existe plus en base de donnés'});

        const existingProduct = await Product.findOne({where: {
            id_artisan: existingArtisan.id,
            id_prestation: existingPresta.id
        }});
        if(!existingProduct) return res.status(404).json({message: 'Le produit n\'existe déjà'});

        await Command.create({
            name: req.body.name,
            picture: req.body.picture,
            dateFinished: null,
            id_user: req.user.id,
            id_product: existingProduct.id,
            id_cloth: existingCloth.id,
            comment: req.body.comment
        });

        res.status(201).json({ 
            message: `Commande créée avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


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