/**
 * @swagger
 * tags:
 *   name: Info
 *   description: CRUD pour la gestion des info
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Info:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'info
 *         name:
 *           type: string
 *           description: Titre / Nom de l'info
 *         content:
 *           type: string
 *           description: Contenu de l'info
 */




/**
 * @swagger
 * /infos:
 *   get:
 *     summary: Récupérer toutes les infos en BDD
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Informations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Info'
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucune info trouvée
 *       500:
 *         description: Erreur interne du serveur
 */