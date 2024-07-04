/**********************************************************
            MÉTHODE POUR LISTER UN PRODUCT
**********************************************************/
/*
    Fonction qui permet de lister les products

    Les vérifications : 
        - l existance de l artisan
        - l existance de la prestation

*/

exports.getAProduct = async (req, res) => {
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