const Artisan = require('../models/artisanModel.js');
const functionsMiddleware = require('../middlewares/functionsMiddleware.js')

/**********************************************************
            MÉTHODE POUR ENREGISTRER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet à une personne de créer un compte artisan

    Les vérifications : 
        - Vérifier que l'email n'existe pas dans la base de donnée
        - Vérifier que le role != admin

*/
exports.registerAnArtisan = async (req, res) => {
    try {
        const existingEmail = await Artisan.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(401).json({ message: 'Cet email existe déjà.' });
        }

        if (!functionsMiddleware.verifyNumberPhone(req.body.mobile)) {
            return res.status(401).json({ message: 'Le numéro de téléphone est éronner'});
        }

        let newArtisan = await Artisan.create(req.body);

        res.status(201).json({ 
            message: `Artisan créé avec succès. L'email : ${newArtisan.email}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};





/**********************************************************
            MÉTHODE POUR CONNECTER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet à une personne de se connecter à son compte artisan

    Les vérifications : 
        - Vérifier que le compte associé à l'email existe
        - Vérifier que le mot de passe est bon

*/
exports.loginAnArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { email: req.body.email } });

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        // const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (artisan.password === req.body.password) {
            const artisanData = {
                id_artisan: artisan.id,
                email: artisan.email,
                role: artisan.role
            };
          
            const token = jwt.sign(artisanData, process.env.JWT_KEY, { expiresIn: "30d" });

            res.status(201).json({ token });

        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};





/**********************************************************
            MÉTHODE POUR LISTER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet de lister les informations d'un artisan

    Les vérifications : 
        - Vérifier que l'artisan existe

*/
exports.getAnArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { email: req.body.email } });

        if (!artisan) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(201).json(artisan);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR MODIFIER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet de modifier les info d'un artisan

    Les vérifications : 
        - Vérifier que l'artisan existe

*/
exports.putAnArtisan = async (req, res) => {
    try {
        const artisan = await Artisan.findOne({ where: { email: req.body.email } });

        if(!artisan){
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        // req.body.password = await bcrypt.hash(req.body.password, 10);

        await artisan.update({ 
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: req.body.password,
            mobile: req.body.mobile,
            id_job: req.body.id_job,
            acceptNewOrder: req.body.acceptNewOrder,
            streetAdress: req.body.streetAdress,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode
        });

        
        res.status(201).json({ message: 'Artisan mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR SUPPRIMER UN ARTISAN
**********************************************************/
/*
    Fonction qui permet de supprimer un compte artisan

    Les vérifications : 
        - Vérifier que l'artisan existe

*/
exports.deleteAnArtisan = async (req, res) => {
    try {
        const deletedArtisan = await Artisan.destroy({
            where: { email: req.user.email }
        });
        
        if (!deletedArtisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }

        res.status(201).json({ message: 'Artisan supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};