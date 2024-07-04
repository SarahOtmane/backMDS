const Product = require('../models/productModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');
const Person = require('../models/personModel');



class ProductController{


    /**********************************************************
                MÉTHODE POUR CREER UN PRODUCT
    **********************************************************/
    /*
        Fonction qui permet de creer une presta d un artisan

        Les vérifications : 
            - l existance de l artisan
            - l existance de la prestation

    */
    static async createAProduct(req, res){
        try {
            const artisan = await Artisan.findOne({ where: { id: req.params.id_artisan} });
            if(!artisan){
                return res.status(404).json({ message: 'Artisan non trouvé.' });
            }

            const existingPresta = await Prestation.findOne({where: {
                reparationType: req.body.reparationType
            }})
            if(!existingPresta) return res.status(404).json({message: 'La prestation n\'existe plus en base de donnés'})

            await Product.create({
                price: req.body.price,
                id_artisan: artisan.id,
                id_prestation: existingPresta.id,
            });

            res.status(201).json({ 
                message: `Product créée avec succès.` 
            });
        } 
        catch (error) {
            res.status(500).json({message: "Erreur lors du traitement des données."});
        }
    };




    /**********************************************************
                MÉTHODE POUR MODIFIER UNE PRESTA_ARTISAN
    **********************************************************/
    /*
        Fonction qui permet d'update le price d une presta dun artisan

        Les vérifications : 
            - l existance de l artisan
            - l existance de la prestation

    */
    static async updateAProduct(req, res){
        try {
            const product = await Product.findOne({where: {id: req.params.id_product}});
            if(!product){
                return res.status(404).json({ message: 'Produit non trouvé.' });
            }

            const person = await Person.findOne({where: {email: req.artisan.email}});
            if(!person){
                return res.status(404).json({ message: 'Personne non trouvée.' });
            }

            const artisan = await Artisan.findOne({ where: { id: person.id_artisan} });
            if(!artisan){
                return res.status(404).json({ message: 'Artisan non trouvé.' });
            }

            const existingPresta = await Prestation.findOne({where: {
                id: req.body.id_prestation
            }})
            if(!existingPresta) return res.status(404).json({message: 'La prestation n\'existe plus en base de donnés'})

            await product.update({
                price: req.body.price,
                id_artisan: artisan.id,
                id_prestation: existingPresta.id,
            });

            res.status(201).json({ 
                message: `Product update avec succès.` 
            });
        } 
        catch (error) {
            res.status(500).json({message: "Erreur lors du traitement des données."});
        }
    };




    /**********************************************************
                MÉTHODE POUR SUPRIMER UN PRODUCT 
    **********************************************************/
    /*
        Fonction qui permet de supprimer un product

        Les vérifications : 
            - l existance de l artisan
            - l existance de la prestation

    */
    static async deleteAProduct(req, res){
        try {
            const deleteProduct = await Product.destroy({where: { 
                id: req.params.id_product
            }});

            if (!deleteProduct) {
                return res.status(404).json({ message: 'Product non trouvé.' });
            }

            res.status(201).json({ message: 'Product supprimé avec succès.' });
        } 
        catch (error) {
            res.status(500).json({message: "Erreur lors du traitement des données."});
        }
    };





    /**********************************************************
                MÉTHODE POUR LISTER UN PRODUCT
    **********************************************************/
    /*
        Fonction qui permet de lister les products

        Les vérifications : 
            - l existance de l artisan
            - l existance de la prestation

    */

    static async getAProduct(req, res){
        try {
            const product = await Product.findByPk(req.params.id_product);
            if(!product){
                return res.status(404).json({ message: 'Produit non trouvé.' })
            }

            const artisan = await Artisan.findOne({where: {id: product.id_artisan}});
            if(!artisan){
                return res.status(404).json({ message: 'Artisan non trouvé.' })
            }
            const presta = await Prestation.findOne({where: {id: product.id_prestation}});
            if(!presta) return res.status(404).json({message: 'La prestation n\'existe plus en base de donnés'})

            let newProduct = {
                price: product.price,
                reparationType: presta.reparationType,
                id_artisan: artisan.id
            }

            res.status(201).json(newProduct);
        } 
        catch (error) {
            res.status(500).json({message: "Erreur lors du traitement des données."});
        }
    }


    /******************************************************************************************
                MÉTHODE POUR LISTER TOUS LES PRODUCTS LIÉS A UN ARTISAN
    ******************************************************************************************/
    /*
        Fonction qui permet de lister les products

        Les vérifications : 
            - l existance de l artisan
            - l existance de la prestation

    */

    static async getAllProductsArtisan(req, res){
        try {
            const artisan = await Artisan.findOne({where: {id: req.params.id_artisan}});
            if(!artisan){
                return res.status(404).json({ message: 'Artisan non trouvé.' });
            }
            const products = await Product.findAll({where: {id_artisan: artisan.id}});
            if(!products){
                return res.status(404).json({ message: 'Auncun product trouvé.' });
            }
            res.status(201).json(products);

        } 
        catch (error) {
            res.status(500).json({message: "Erreur lors du traitement des données."});
        }
    };


    /***************************************************************************
                MÉTHODE POUR LISTER UN PRODUCT LIÉ A UNE PRESTA ET UN ARTISAN
    ***************************************************************************/
    /*
        Fonction qui permet de lister les products

        Les vérifications : 
            - l existance de l artisan
            - l existance de la prestation

    */

    static async getPrestaProduct(req, res){
        try {
            const artisan = await Artisan.findOne({where: {id: req.params.id_artisan}});
            if(!artisan){
                return res.status(404).json({ message: 'Artisan non trouvé.' })
            }

            const presta = await Prestation.findOne({where: {id: req.params.id_prestation}});
            if(!presta) return res.status(404).json({message: 'La prestation n\'existe plus en base de donnés'})

            const product = await Product.findOne({where: {
                id_artisan : artisan.id,
                id_prestation: presta.id
            }});
            if(!product){
                return res.status(404).json({ message: 'Produit non trouvé.' })
            }

            res.status(201).json(product);
        } 
        catch (error) {
            res.status(500).json({message: "Erreur lors du traitement des données."});
        }
    };
}

module.exports = ProductController;