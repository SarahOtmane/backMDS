/**
 * @swagger
 * tags:
 *   name: Prestation
 *   description: CRUD pour la gestion des prestations
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Prestation:
 *       type: object
 *       required:
 *         - id
 *         - categorie
 *         - clotheType
 *         - reparationType
 *         - priceSuggested
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la prestation
 *         categorie:
 *           type: string
 *           description: Categorie de vêtements (ex : haut)
 *         clotheType:
 *           type: string
 *           description: Type de vêtements (ex: doudoune)
 *         reparationType:
 *           type: string
 *           description: Type de la réparation (ex: zip)
 *         priceSuggested:
 *           type: integer
 *           description: Prix conseillé par l'admin
 */