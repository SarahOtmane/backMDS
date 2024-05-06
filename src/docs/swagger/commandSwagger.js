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
 *         - dateFinished
 *         - id_prestation
 *         - id_user
 *         - id_artisan
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
 *           type: timestamp()
 *           description: Date de préparation de la commande
 *         id_prestation:
 *           type: integer
 *           description: Clé étrangère, qui correpsond à la prestation
 *         id_user:
 *           type: integer
 *           description: Clé étrangère, correspond à l'utilisateur
 *         id_artisan:
 *          type: integer
 *          description: Clé étrangère, correspond à l'artisan qui s'occupe de la commande
 */



/**
 * @swagger
 * /commands/{id}:
 *   post:
 *     summary: Créer une commande
 *     tags: [Command]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'artisan qui s'occupe de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Command'
 *     responses:
 *       201:
 *         description: Commande créer avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Artisan non trouvé / prestation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */