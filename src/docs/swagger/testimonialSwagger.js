/**
 * @swagger
 * tags:
 *   name: Testimonial
 *   description: CRUD pour la gestion des témoignages
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Command:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - picture
 *         - stars
 *         - id_user
 *         - id_artisan
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du témoignage
 *         content:
 *           type: string
 *           description: Contenu du témoignage
 *         picture:
 *           type: string
 *           description: Image du vêtement de l'utilisateur
 *         stars:
 *           type: integer
 *           description: Note sur 5 attribué par l'utilisateur
 *         id_user:
 *           type: integer
 *           description: Clé étrangère, correspond à l'utilisateur qui a laissé le témoignage
 *         id_artisan:
 *          type: integer
 *          description: Clé étrangère, correspond à l'artisan à qui on a laissé le témoignage
 */