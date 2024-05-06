/**
 * @swagger
 * tags:
 *   name: Command
 *   description: CRUD pour la gestion des commandes
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Command:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - picture
 *         - dateFinished
 *         - id_prestation
 *         - id_user
 *         - id_artisan
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la commande
 *         name:
 *           type: string
 *           description: Nom / Titre de la commande
 *         picture:
 *           type: string
 *           description: Image du vêtement de l'utilisateur
 *         dateFinished:
 *           type: timestamp()
 *           description: Date de préparation de la commande
 *         id_prestation:
 *           type: integer
 *           description: Clé étrangère, qui correpsond à la prestation
 *         id_user:
 *           type: integer
 *           description: Clé étrangère, correspond à l'utilisateur
 *         id_artisan:
 *          type: integer
 *          description: Clé étrangère, correspond à l'artisan qui s'occupe de la commande
 */