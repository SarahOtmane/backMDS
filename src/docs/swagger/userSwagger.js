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
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'utilisateur
 *         email:
 *           type: string
 *           description: Adresse email de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           description: Rôle de l'utilisateur (user/admin)
 *         firstname:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         lastname:
 *           type: string
 *           description: Nom de l'utilisateur
 *         mobile:
 *           type: string
 *           description: Numéro de téléphone de l'utilisateur
 *         subscribeNewsletter:
 *           type: boolean
 *           description: Abonnement à la newsletter
 *         streetAdress:
 *           type: string
 *           description: Adresse de l'utilisateur
 *         city:
 *           type: string
 *           description: Ville de l'utilisateur
 *         country:
 *           type: string
 *           description: Pays de l'utilisateur
 *         postalCode:
 *           type: string
 *           description: Code postal de l'utilisateur
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
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               mobile:
 *                 type: string
 *               streetAdress:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       401:
 *         description: Vous ne pouvez pas créer un compte avec le rôle admin
 *       409:
 *         description: L'utilisateur avec cet email existe déjà
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Se connecter à un compte utilisateur
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
 *         description: Email ou mot de passe incorrect
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
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Token manquant ou invalide
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
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               mobile:
 *                 type: string
 *               subscribeNewsletter:
 *                 type: boolean
 *               streetAdress:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *       403:
 *         description: Token manquant ou invalide
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
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users/updatePassword:
 *   put:
 *     summary: Mettre à jour le mot de passe de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - password
 *     responses:
 *       201:
 *         description: Mot de passe mis à jour avec succès
 *       400:
 *         description: Mot de passe incorrect
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Envoyer un email pour réinitialiser le mot de passe
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
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email de réinitialisation envoyé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: Réinitialiser le mot de passe via un token
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token pour réinitialiser le mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Lien de réinitialisation invalide ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /users/admin:
 *   get:
 *     summary: Récupérer tous les utilisateurs (Admin seulement)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
