/**
 * @swagger
 * tags:
 *   name: Info
 *   description: CRUD pour la gestion des informations
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
 *           description: ID de l'information
 *         name:
 *           type: string
 *           description: Nom de l'information
 *         content:
 *           type: string
 *           description: Contenu de l'information
 */


/**
 * @swagger
 * /infos:
 *   get:
 *     summary: Récupérer toutes les informations en BDD
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Informations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Info'
 *       404:
 *         description: Aucune information trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /infos/{id_info}:
 *   get:
 *     summary: Récupérer une information par ID
 *     tags: [Info]
 *     parameters:
 *       - in: path
 *         name: id_info
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'information à récupérer
 *     responses:
 *       200:
 *         description: Information récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Info'
 *       404:
 *         description: Aucune information trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /infos:
 *   post:
 *     summary: Enregistrer une information en BDD (Admin seulement)
 *     tags: [Info]
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
 *               content:
 *                 type: string
 *             required:
 *               - name
 *               - content
 *     responses:
 *       201:
 *         description: Information créée avec succès
 *       401:
 *         description: Information existe déjà en BDD
 *       403:
 *         description: Token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /infos/{id_info}:
 *   put:
 *     summary: Modifier une information par l'admin
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_info
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'information à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - name
 *               - content
 *     responses:
 *       200:
 *         description: Information mise à jour avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune information trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer une information par l'admin
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_info
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'information à supprimer
 *     responses:
 *       200:
 *         description: Information supprimée avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune information trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
