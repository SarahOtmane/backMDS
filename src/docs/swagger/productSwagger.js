/**
 * @swagger
 * tags:
 *   name: Product
 *   description: CRUD pour la gestion des produits
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - price
 *         - id_artisan
 *         - id_prestation
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du produit
 *         price:
 *           type: integer
 *           description: Prix du produit
 *         id_artisan:
 *           type: integer
 *           description: ID de l'artisan associé
 *         id_prestation:
 *           type: integer
 *           description: ID de la prestation associée
 */


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Créer un nouveau produit (Artisan seulement)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: integer
 *               reparationType:
 *                 type: string
 *             required:
 *               - price
 *               - reparationType
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       404:
 *         description: Artisan ou prestation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /products/artisan/{id_artisan}:
 *   get:
 *     summary: Récupérer tous les produits d'un artisan
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'artisan
 *     responses:
 *       200:
 *         description: Produits récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Artisan ou produits non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /products/{id_product}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit à récupérer
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /products/{id_product}:
 *   put:
 *     summary: Modifier un produit (Artisan seulement)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: integer
 *               id_prestation:
 *                 type: integer
 *             required:
 *               - price
 *               - id_prestation
 *     responses:
 *       201:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit, artisan ou prestation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer un produit (Artisan seulement)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit à supprimer
 *     responses:
 *       201:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


/**
 * @swagger
 * /products/{id_artisan}/{id_prestation}:
 *   get:
 *     summary: Récupérer un produit lié à une prestation et un artisan
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'artisan
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit, artisan ou prestation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
