/**
 * @swagger
 * tags:
 *   name: Command
 *   description: CRUD pour la gestion des commandes
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Command:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - picture
 *         - id_product
 *         - id_user
 *         - id_cloth
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la commande
 *         name:
 *           type: string
 *           description: Nom / Titre de la commande
 *         picture:
 *           type: string
 *           description: Image du vêtement de l'utilisateur
 *         dateFinished:
 *           type: string
 *           format: date-time
 *           description: Date de préparation de la commande
 *         comment:
 *           type: string
 *           description: Commentaire de l'utilisateur sur la commande
 *         id_product:
 *           type: integer
 *           description: ID du produit associé à la commande
 *         id_user:
 *           type: integer
 *           description: ID de l'utilisateur qui a passé la commande
 *         id_cloth:
 *           type: integer
 *           description: ID du vêtement associé à la commande
 */


/**
 * @swagger
 * /commands/{id_artisan}:
 *   post:
 *     summary: Créer une commande
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'artisan qui s'occupe de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 categorie:
 *                   type: string
 *                 clothType:
 *                   type: string
 *                 id_job:
 *                   type: integer
 *                 reparationType:
 *                   type: string
 *                 comment:
 *                   type: string
 *               required:
 *                 - name
 *                 - picture
 *                 - categorie
 *                 - clothType
 *                 - id_job
 *                 - reparationType
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Artisan, prestation ou vêtement non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /commands/artisans:
 *   get:
 *     summary: Récupérer toutes les commandes concernant un artisan
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commandes récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Command'
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune commande trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /commands/users:
 *   get:
 *     summary: Récupérer toutes les commandes concernant un utilisateur
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commandes récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Command'
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune commande trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /commands:
 *   get:
 *     summary: Récupérer toutes les commandes en BDD (Admin seulement)
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commandes récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Command'
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune commande trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /commands/{id_command}:
 *   put:
 *     summary: Modifier une commande par l'admin
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_command
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Command'
 *     responses:
 *       201:
 *         description: Commande modifiée avec succès
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Commande non trouvée / prestation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
