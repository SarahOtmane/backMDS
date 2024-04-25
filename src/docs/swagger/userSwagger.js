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
 *         description: Requête invalide
 *       409:
 *         description: L'utilisateur avec cet email existe déjà
 */