const Testimonial = require('../models/testimonialModel');
const Artisan = require('../models/artisanModel');


/**********************************************************
            MÉTHODE POUR CREER UN TESTIMONIAL
**********************************************************/
/*
    Fonction qui permet à un user de créer un témoignage

    Les vérifications : 
        - l artisan en question existe en bdd

*/
exports.createATestimonial = async (req, res) => {
    try {

        let artisan = await Artisan.findByPk(req.params.id_artisan);

        if(!artisan){
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        let newTestimonial = await Testimonial.create({
            name: req.body.name,
            picture: req.body.picture,
            stars: req.body.picture,
            id_user: req.user.id,
            id_artisan: req.params.id_artisan
        });

        res.status(201).json({ 
            message: `Témoignage créé avec succès.` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/**********************************************************
            MÉTHODE POUR LISTER UN TEMOIGNAGE
**********************************************************/
/*
    Fonction qui permet de lister un temoignage

    Les vérifications : 
        - Vérifier que le temoignage existe

*/
exports.getATestimonial = async (req, res) => {
    try {
        const Testimonial = await Testimonial.findOne({ where: { name: req.body.name } });

        if (!Testimonial) {
            return res.status(404).json({ message: 'Temoignage non trouvé.' });
        }

        res.status(201).json(Testimonial);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR MODIFIER UN TEMOIGNAGE
**********************************************************/
/*
    Fonction qui permet de modifier un temoignage

    Les vérifications : 
        - Vérifier que le temoignage existe
        - le user qui essaie de modif un temoignage  c celui qui la pub

*/
exports.putATestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findOne({ where: { name: req.body.name } });

        if(!testimonial){
            return res.status(404).json({ message: 'Temoignage non trouvé.' });
        }

        if ( req.user.role === 'user' && req.user.id != testimonial.id_user) {
            return res.status(403).json({ message: 'Vous n avez pas l autorisation de modifier ce témoignage.'});
        }

        await testimonial.update({ 
            name: req.body.name,
        });

        
        res.status(201).json({ message: 'Temoignage mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR SUPPRIMER UN TEMOIGNAGE
**********************************************************/
/*
    Fonction qui permet de supprimer un commentaire

    Les vérifications : 
        - Vérifier que le job existe
        - le user qui essaie de supp un temoignage c celui qui la pub

*/
exports.deleteATestimonial = async (req, res) => {
    try {
        if ( req.user.role === 'user' && req.user.id != testimonial.id_user) {
            return res.status(403).json({ message: 'Vous n avez pas l autorisation de supprimer ce témoignage.'});
        }

        const deleteATestimonial = await Testimonial.destroy({
            where: { name: req.body.name }
        });
        
        if (!deleteATestimonial) {
            return res.status(404).json({ message: 'Testimonial non trouvé.' });
        }

        res.status(201).json({ message: 'Testimonial supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};