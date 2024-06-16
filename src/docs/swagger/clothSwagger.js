/**
 * @swagger
 * tags:
 *   name: Cloth
 *   description: Gestion des vêtements
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Cloth:
 *       type: object
 *       required:
 *         - id
 *         - categorie
 *         - clothType
 *         - id_job
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du vêtement
 *         categorie:
 *           type: string
 *           description: Catégorie du vêtement
 *         clothType:
 *           type: string
 *           description: Type du vêtement
 *         id_job:
 *           type: integer
 *           description: ID du job associé
 */


/**
 * @swagger
 * /clothes:
 *   get:
 *     summary: Récupérer tous les vêtements en BDD
 *     tags: [Cloth]
 *     responses:
 *       200:
 *         description: Vêtements récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cloth'
 *       404:
 *         description: Aucun vêtement trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /clothes/{id_cloth}:
 *   get:
 *     summary: Récupérer un vêtement par ID
 *     tags: [Cloth]
 *     parameters:
 *       - in: path
 *         name: id_cloth
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du vêtement à récupérer
 *     responses:
 *       200:
 *         description: Vêtement récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cloth'
 *       404:
 *         description: Aucun vêtement trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /clothes/job/{id_job}:
 *   get:
 *     summary: Récupérer tous les vêtements d'un job
 *     tags: [Cloth]
 *     parameters:
 *       - in: path
 *         name: id_job
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du job pour lequel récupérer les vêtements
 *     responses:
 *       200:
 *         description: Vêtements récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cloth'
 *       404:
 *         description: Aucun vêtement trouvé pour ce job
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /clothes:
 *   post:
 *     summary: Enregistrer un vêtement en BDD (Admin seulement)
 *     tags: [Cloth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categorie:
 *                 type: string
 *               clothType:
 *                 type: string
 *               id_job:
 *                 type: integer
 *             required:
 *               - categorie
 *               - clothType
 *               - id_job
 *     responses:
 *       201:
 *         description: Vêtement créé avec succès
 *       401:
 *         description: Vêtement existe déjà en BDD
 *       403:
 *         description: Token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /clothes/{id_cloth}:
 *   put:
 *     summary: Modifier un vêtement par l'admin
 *     tags: [Cloth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_cloth
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du vêtement à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categorie:
 *                 type: string
 *               clothType:
 *                 type: string
 *               id_job:
 *                 type: integer
 *             required:
 *               - categorie
 *               - clothType
 *               - id_job
 *     responses:
 *       200:
 *         description: Vêtement mis à jour avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucun vêtement trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer un vêtement par l'admin
 *     tags: [Cloth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_cloth
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du vêtement à supprimer
 *     responses:
 *       200:
 *         description: Vêtement supprimé avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucun vêtement trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
