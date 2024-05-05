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



/**
 * @swagger
 * /prestations:
 *   get:
 *     summary: Récupérer toutes les prestations en BDD
 *     tags: [Prestation]
 *     responses:
 *       201:
 *         description: Prestations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestation'
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */