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
 *     responses:
 *       201:
 *         description: Informations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Info'
 *       404:
 *         description: Aucune info trouvée
 *       500:
 *         description: Erreur interne du serveur
 */



/**
 * @swagger
 * /infos/{id}:
 *   get:
 *     summary: Récupérer une info
 *     tags: [Info]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'info à récupérer
 *     responses:
 *       201:
 *         description: Information récupérée avec succès
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



/**
 * @swagger
 * /infos:
 *   post:
 *     summary: Enregistrer une info en BDD
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
 *       200:
 *         description: info crée avec succès
 *       401:
 *         description: Info existe déja en BDD
 *       403:
 *         description: Token manquant ou invalide / Vous n'etes pas un admin
 *       500:
 *         description: Erreur interne du serveur
 */




/**
 * @swagger
 * /infos/{id}:
 *   put:
 *     summary: Modifier une info par l'admin
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'info à récupérer
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
 *         description: Information mise à jour avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucune info trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer une info par l'admin
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'info à récupérer
 *     responses:
 *       201:
 *         description: Information supprimée avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucune info trouvée
 *       500:
 *         description: Erreur interne du serveur
 */