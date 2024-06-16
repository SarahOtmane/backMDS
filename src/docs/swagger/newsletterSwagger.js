/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Gestion des inscriptions à la newsletter
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Newsletter:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Adresse email de l'utilisateur inscrit à la newsletter
 */


/**
 * @swagger
 * /newsletters:
 *   post:
 *     summary: Inscrire un utilisateur à la newsletter
 *     tags: [Newsletter]
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
 *       201:
 *         description: Utilisateur inscrit à la newsletter avec succès
 *       401:
 *         description: Cet email est déjà inscrit à la newsletter
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /newsletters:
 *   get:
 *     summary: Récupérer tous les emails inscrits à la newsletter (Admin seulement)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des emails inscrits récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userInscrits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                 emailsInscrits:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Newsletter'
 *       404:
 *         description: Aucun email n'est inscrit à la newsletter
 *       500:
 *         description: Erreur interne du serveur
 */
