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
 *     Job:
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
 *       404:
 *         description: Aucun job trouvé
 *       500:
 *         description: Erreur interne du serveur
 */



/**
 * @swagger
 * /jobs/{id_job}:
 *   get:
 *     summary: Récupérer un job
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: id_job
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
 *       404:
 *         description: Aucun job trouvée
 *       500:
 *         description: Erreur interne du serveur
 */




/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Enregistrer un job en BDD
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: job créé avec succès
 *       401:
 *         description: Job existe déja en BDD
 *       403:
 *         description: Token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */






/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Modifier un job par l'admin
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du job à récupérer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Job mis à jour avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucun job trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer un job par l'admin
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du job à récupérer
 *     responses:
 *       201:
 *         description: Job supprimé avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucun job trouvée
 *       500:
 *         description: Erreur interne du serveur
 */