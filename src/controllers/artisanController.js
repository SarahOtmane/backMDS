const Artisan = require("../models/artisanModel");
const Address = require("../models/adressModel");
const Person = require("../models/personModel");


class ArtisanController{
    /************************************************************************
            MÉTHODE POUR LISTER TOUS LES ARTISANS (id_job, postalCode)
    ************************************************************************/
    /*
        Fonction qui permet de lister tous les artisans

        Les vérifications : 
            - Vérifier que le métier est renseigné
            - Vérifier que les artisans existent
            - Vérifier que les adresses existent
            - Vérifier que les personnes existent
    */
    static async getAllArtisansWithFiltre(req, res) {
        try {
            if (!req.params.name_job || req.params.name_job.trim() === '') {
                return res.status(400).json('Métier non renseigné');
            }

            // Récupérer tous les artisans avec le name_job
            const artisans = await Artisan.findAll({ where: { name_job: req.params.name_job } });
            if (!artisans.length) {
                return res.status(404).json('Aucun artisan trouvé');
            }

            // Extraire les IDs des artisans
            const artisanIds = artisans.map(artisan => artisan.id);

            let persons = [];

            if(req.params.postalcode !== '-1'){
                // Récupérer toutes les adresses avec le code postal renseigné
                const addresses = await Address.findAll({ where: { postalCode: req.params.postalcode } });
                if (!addresses.length) {
                    return res.status(404).json('Aucune adresse pour ce code postal');
                }

                // Extraire les IDs des adresses
                const addressIds = addresses.map(address => address.id);

                // Récupérer toutes les personnes avec id_artisan et id_address
                persons = await Person.findAll({
                    where: {
                        id_artisan: artisanIds,
                        id_address: addressIds
                    }
                });
            }else{
                // Récupérer toutes les personnes avec id_artisan
                persons = await Person.findAll({
                    where: {
                        id_artisan: artisanIds
                    }
                });
            }

            if (!persons.length) {
                return res.status(404).json('Aucune personne trouvée');
            }

            return res.status(200).json(persons);

        } catch (error) {
            console.error('Erreur lors du traitement des données:', error);
            return res.status(500).json({ message: "Erreur lors du traitement des données." });
        }
    }


    static async getDetailArtisan (req, res){
        try {
            const artisan = await Artisan.findOne({where: {id: req.params.id_artisan}});
            if (!artisan) {
                return res.status(404).json('Aucun artisan trouvé');
            }
            return res.status(200).json(artisan);
        } catch (error) {
            return res.status(500).json({ message: "Erreur lors du traitement des données." });
        }
    }
}

module.exports = ArtisanController;