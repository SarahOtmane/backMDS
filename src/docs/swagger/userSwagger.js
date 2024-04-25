/**
 * @swagger
 * tags:
 *   name: User
 *   description: CRUD pour la gestion des utilisateurs
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id_user:
 *           type: integer
 *           description: ID de l'utilisateur
 *         firstname:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         lastname:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           description: Adresse email de l'utilisateur
 *         role:
 *           type: string
 *           description: Rôle de l'utilisateur (user, admin)
 *         password:
 *           type: string
 *           description: Password de l'utilisateur
 */


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       401:
 *         description: L'utilisateur avec cet email existe déjà
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connecter un utilisateur existant
 *     tags: [User]
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
 *         description: Utilisateur connecté avec succès
 *       401:
 *         description: Email ou Mdp incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   put:
 *     summary: Mettre à jour les informations de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer le compte de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Compte utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
