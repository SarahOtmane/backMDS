const Testimonial = require('../models/testimonialModel');


/**********************************************************
            MÉTHODE POUR CREER UN TESTIMONIAL
**********************************************************/
/*
    Fonction qui permet à un user de créer un témoignage

    Les vérifications : 
        - role !== admin

*/
exports.createATestimonial = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(401).json({ message: 'Vous ne pouvez pas créer un témoignage avec le rôle admin.'});
        }

        let newTestimonial = await Testimonial.create(req.body);

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