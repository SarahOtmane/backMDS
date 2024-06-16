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
            content: req.body.content,
            picture: req.body.picture,
            stars: req.body.stars,
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
        const Testimonial = await Testimonial.findOne({ where: { id: req.params.id_testimonial } });

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
        const testimonial = await Testimonial.findOne({ where: { id: req.params.id } });

        if(!testimonial){
            return res.status(404).json({ message: 'Temoignage non trouvé.' });
        }

        if (req.user.id != testimonial.id_user) {
            return res.status(403).json({ message: 'Vous n\'avez pas l\'autorisation de modifier ce témoignage.'});
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
        - Vérifier que le temoignage existe
        - le user qui essaie de supp un temoignage c celui qui la pub ou admin

*/
exports.deleteATestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id_testimonial);

        if((req.user.role === 'user' && req.user.id === testimonial.id_user) || req.user.role === 'admin'){
            const deleteATestimonial = await Testimonial.destroy({where: { id: req.params.id_testimonial }});
            
            if (!deleteATestimonial) {
                return res.status(404).json({ message: 'Testimonial non trouvé.' });
            }
    
            res.status(201).json({ message: 'Testimonial supprimé avec succès.' });
        }

        return res.status(403).json({ message: 'Vous n\'avez pas l\'autorisation de supprimer ce témoignage.'});

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};



/**********************************************************
            MÉTHODE POUR LISTER TOUS LES TESTIMONIALS
**********************************************************/
/*
    Fonction qui permet de lister tous les testimonials

    Les vérifications : 
        - Vérifier que les testimonials existent

*/
exports.getAllTestimonial = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        
        if (!testimonials) {
            return res.status(404).json({ message: 'Auncun testimonial trouvé.' });
        }

        res.status(201).json(testimonials);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/*************************************************************************
            MÉTHODE POUR LISTER TOUS LES TESTIMONIALS D'UN ARTISAN
*************************************************************************/
/*
    Fonction qui permet de lister tous les testimonials d'un artisan

    Les vérifications : 
        - Vérifier l'existance de l'artisan
        - Vérifier que les testimonials existent

*/
exports.getAllTestimonialForArtisan = async (req, res) => {
    try {
        let artisan = await Artisan.findByPk(req.params.id_artisan);

        if(!artisan){
            return res.status(404).json({ message: 'Aucun artisan trouvé.' });
        }

        const testimonials = await Testimonial.findAll({where: {id_artisan: req.params.id_artisan}});

        res.status(201).json(testimonials);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};