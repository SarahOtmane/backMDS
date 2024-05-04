/**
 * @swagger
 * tags:
 *   name: Artisan
 *   description: CRUD pour la gestion des artisans
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Artisan:
 *       type: object
 *       required:
 *         - id
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - mobile
 *         - acceptNewOrder
 *         - streetAdress
 *         - city
 *         - country
 *         - postalCode
 *         - id_job
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'artisan
 *         firstname:
 *           type: string
 *           description: Prénom de l'artisan
 *         lastname:
 *           type: string
 *           description: Nom de l'artisan
 *         email:
 *           type: string
 *           description: Adresse email de l'artisan
 *         mobile:
 *           type: string
 *           description: Numéro de téléphone de l'artisan
 *         password:
 *           type: string
 *           description: Password de l'artisan
 *         acceptNewOrder:
 *          type: boolean
 *          description: Est ce que l'artisan accepte de nouvelles réparations
 *         streetAdress:
 *           type: string
 *           description: Numéro de la rue de l'artisan
 *         city:
 *           type: string
 *           description: Nom de la ville
 *         country:
 *          type: string
 *          description: Pays de l'artisan
 *         postalCode:
 *          type: integer
 *          description: Code postal
 *         id_job
 *          type: integer
 *          description: Clé étrangère vers la table jobs
 */


/**
 * @swagger
 * /artisans/register:
 *   post:
 *     summary: Enregistrer un nouvel artisan
 *     tags: [Artisan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artisan'
 *     responses:
 *       201:
 *         description: Artisan enregistré avec succès
 *       401:
 *         description: L'artisan avec cet email existe déjà / mauvais format de numero ou email
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /artisans/login:
 *   post:
 *     summary: Se connecter à un compte artisan
 *     tags: [Artisan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: artisan connecté avec succès
 *       401:
 *         description: Email ou Mdp incorrect
 *       404:
 *         description: artisan non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /artisans:
 *   get:
 *     summary: Récupérer les informations de l'artisan connecté
 *     tags: [Artisan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Informations de l'artisan récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artisan'
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: artisan non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   put:
 *     summary: Mettre à jour les informations de l'artisan connecté
 *     tags: [Artisan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artisan'
 *     responses:
 *       201:
 *         description: Informations de l'artisan mises à jour avec succès
 *       404:
 *         description: artisan non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer le compte de l'artisan connecté
 *     tags: [Artisan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Compte artisan supprimé avec succès
 *       404:
 *         description: artisan non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
