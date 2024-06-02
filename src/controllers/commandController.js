const Command = require('../models/commandModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');
const Cloth = require('../models/clothModel');
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
            categorie: req.body.categorie,
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
            id_cloth: existingCloth.id
        });

        res.status(201).json({ 
            message: `Commande créée avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};





/**********************************************************
            MÉTHODE POUR MODIFIER UNE COMMANDE (ADMIN)
**********************************************************/
/*
    Fonction qui permet de modifier une commande par l'admin

    Les vérifications : 
        - Vérifier que la commande existe

*/
// exports.putACommand = async (req, res) => {
//     try {
//         const command = await Command.findOne({ where: { id: req.params.id } });
//         if(!command){
//             return res.status(404).json({ message: 'Commande non trouvée.' });
//         }

//         const existingCloth = await Cloth.findOne({where: {
//             categorie: req.body.categorie,
//             clothType: req.body.clothType,
//         }})
//         if(!existingCloth) return res.status(401).json({message: 'L\'habit n\'existe plys en base de donnés'});

//         await command.update({ 
//             name: req.body.name,
//             picture: req.body.picture,
//             id_prestation: existingPresta.id,
//         });

        
//         res.status(201).json({ message: 'Information mise à jour avec succès.' });

//     } catch (error) {
//         res.status(500).json({message: "Erreur lors du traitement des données."});
//     }
// };




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
            MÉTHODE POUR LISTER TOUTES LES COMMANDES ARTISAN
*****************************************************************/
/*
    Fonction qui permet de lister toutes les commandes d'un artisan

    Les vérifications : 
        - Vérifier que les commandes existent

*/
exports.getCommandOfArtisan = async (req, res) => {
    try {
        const product = await Product.findAll({where: {id: req.artisan.id}});
        if (!product) {
            return res.status(404).json({ message: 'Auncune produit pour cet artisan.' });
        }

        let comands = [];

        for(let index = 0; index < product.length; index++){
            const comand = await Command.findAll({where: {id_product: product[index].id}});
            if(comand) comands.push(comand)
        }

        if(!comands) return res.status(404).json({ message: 'Auncune commande trouvée.' });
        res.status(201).json(comands);

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
        const commands = await Command.findAll({where: {id: req.user.id}});
        
        if (!commands) {
            return res.status(404).json({ message: 'Auncune commande trouvée.' });
        }

        res.status(201).json(commands);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};