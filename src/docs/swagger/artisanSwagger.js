/**
 * @swagger
 * tags:
 *   name: Artisan
 *   description: CRUD pour la gestion des artisans
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Artisan:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - mobile
 *         - acceptNewOrder
 *         - id_place
 *         - id_job
 *       properties:
 *         id_place:
 *           type: integer
 *           description: Clé étrangère vers la table places(lieux de travail de l'artisan)
 *         firstname:
 *           type: string
 *           description: Prénom de l'artisan
 *         lastname:
 *           type: string
 *           description: Nom de l'artisan
 *         email:
 *           type: string
 *           description: Adresse email de l'artisan
 *         mobile:
 *           type: string
 *           description: Numéro de téléphone de l'artisan
 *         password:
 *           type: string
 *           description: Password de l'artisan
 *         acceptNewOrder:
 *          type: boolean
 *          description: Est ce que l'artisan accepte de nouvelles réparations
 *         id_job
 *          type: integer
 *          description: Clé étrangère vers la table jobs
 */