/**
 * @swagger
 * tags:
 *   name: Job
 *   description: CRUD pour la gestion des job
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
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du job
 *         name:
 *           type: string
 *           description: Titre / Nom de la catégorie d'artisans
 */



/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Récupérer tous les jobs en BDD
 *     tags: [Job]
 *     responses:
 *       201:
 *         description: Jobs récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucun job trouvée
 *       500:
 *         description: Erreur interne du serveur
 */



/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Récupérer un job
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du job à récupérer
 *     responses:
 *       201:
 *         description: Job récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucun job trouvée
 *       500:
 *         description: Erreur interne du serveur
 */