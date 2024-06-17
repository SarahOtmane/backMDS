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
 *         - reparationType
 *         - priceSuggested
 *         - id_job
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la prestation
 *         reparationType:
 *           type: string
 *           description: Type de la réparation
 *         priceSuggested:
 *           type: integer
 *           description: Prix conseillé par l'admin
 *         id_job:
 *           type: integer
 *           description: ID du job associé
 */


/**
 * @swagger
 * /prestations:
 *   get:
 *     summary: Récupérer toutes les prestations en BDD
 *     tags: [Prestation]
 *     responses:
 *       200:
 *         description: Prestations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /prestations/{id_prestation}:
 *   get:
 *     summary: Récupérer une prestation par ID
 *     tags: [Prestation]
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation à récupérer
 *     responses:
 *       200:
 *         description: Prestation récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /prestations/job/{id_job}:
 *   get:
 *     summary: Récupérer toutes les prestations d'un job
 *     tags: [Prestation]
 *     parameters:
 *       - in: path
 *         name: id_job
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du job pour lequel récupérer les prestations
 *     responses:
 *       200:
 *         description: Prestations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: Aucune prestation trouvée pour ce job
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /prestations:
 *   post:
 *     summary: Enregistrer une prestation en BDD (Admin seulement)
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reparationType:
 *                 type: string
 *               priceSuggested:
 *                 type: integer
 *               id_job:
 *                 type: integer
 *             required:
 *               - reparationType
 *               - priceSuggested
 *               - id_job
 *     responses:
 *       201:
 *         description: Prestation créée avec succès
 *       401:
 *         description: Cette prestation existe déjà
 *       403:
 *         description: Token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /prestations/{id_prestation}:
 *   put:
 *     summary: Modifier une prestation par l'admin
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reparationType:
 *                 type: string
 *               priceSuggested:
 *                 type: integer
 *               id_job:
 *                 type: integer
 *             required:
 *               - reparationType
 *               - priceSuggested
 *               - id_job
 *     responses:
 *       201:
 *         description: Prestation mise à jour avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer une prestation par l'admin
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation à supprimer
 *     responses:
 *       201:
 *         description: Prestation supprimée avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
