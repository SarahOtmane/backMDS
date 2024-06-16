/**
 * @swagger
 * tags:
 *   name: Testimonial
 *   description: CRUD pour la gestion des témoignages
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - picture
 *         - stars
 *         - id_user
 *         - id_artisan
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du témoignage
 *         content:
 *           type: string
 *           description: Contenu du témoignage
 *         picture:
 *           type: string
 *           description: Image associée au témoignage
 *         stars:
 *           type: integer
 *           description: Note sur 5 attribuée par l'utilisateur
 *         id_user:
 *           type: integer
 *           description: Clé étrangère, correspond à l'utilisateur qui a laissé le témoignage
 *         id_artisan:
 *           type: integer
 *           description: Clé étrangère, correspond à l'artisan à qui on a laissé le témoignage
 */


/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Récupérer tous les témoignages en BDD
 *     tags: [Testimonial]
 *     responses:
 *       200:
 *         description: Témoignages récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Aucun témoignage trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /testimonials/artisan/{id_artisan}:
 *   get:
 *     summary: Récupérer tous les témoignages liés à un artisan
 *     tags: [Testimonial]
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'artisan
 *     responses:
 *       200:
 *         description: Témoignages récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Aucun témoignage trouvé / Artisan non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   post:
 *     summary: Créer un témoignage par rapport à un artisan
 *     tags: [Testimonial]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'artisan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               picture:
 *                 type: string
 *               stars:
 *                 type: integer
 *             required:
 *               - content
 *               - picture
 *               - stars
 *     responses:
 *       201:
 *         description: Témoignage créé avec succès
 *       404:
 *         description: Artisan non trouvé en BDD
 *       403:
 *         description: Token manquant ou invalide 
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /testimonials/{id_testimonial}:
 *   get:
 *     summary: Récupérer un témoignage
 *     tags: [Testimonial]
 *     parameters:
 *       - in: path
 *         name: id_testimonial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du témoignage à récupérer
 *     responses:
 *       200:
 *         description: Témoignage récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Aucun témoignage trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   put:
 *     summary: Modifier un témoignage 
 *     tags: [Testimonial]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_testimonial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du témoignage à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               picture:
 *                 type: string
 *               stars:
 *                 type: integer
 *             required:
 *               - content
 *               - picture
 *               - stars
 *     responses:
 *       201:
 *         description: Témoignage mis à jour avec succès
 *       403:
 *         description: Token manquant ou invalide / Vous n'avez pas l'autorisation pour modifier
 *       404:
 *         description: Aucun témoignage trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer un témoignage 
 *     tags: [Testimonial]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_testimonial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du témoignage à supprimer
 *     responses:
 *       201:
 *         description: Témoignage supprimé avec succès
 *       403:
 *         description: Token manquant ou invalide / Vous n'avez pas l'autorisation pour supprimer
 *       404:
 *         description: Aucun témoignage trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
