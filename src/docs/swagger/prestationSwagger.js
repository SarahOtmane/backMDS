/**
 * @swagger
 * tags:
 *   name: Prestation
 *   description: CRUD pour la gestion des prestations
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Prestation:
 *       type: object
 *       required:
 *         - id
 *         - categorie
 *         - clotheType
 *         - reparationType
 *         - priceSuggested
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la prestation
 *         categorie:
 *           type: string
 *           description: Categorie de vêtements (ex:haut)
 *         clotheType:
 *           type: string
 *           description: Type de vêtements (ex:doudoune)
 *         reparationType:
 *           type: string
 *           description: Type de la réparation (ex:zip)
 *         priceSuggested:
 *           type: integer
 *           description: Prix conseillé par l'admin
 */



/**
 * @swagger
 * /prestations:
 *   get:
 *     summary: Récupérer toutes les prestations en BDD
 *     tags: [Prestation]
 *     responses:
 *       201:
 *         description: Prestations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */



/**
 * @swagger
 * /prestations/{id_prestation}:
 *   get:
 *     summary: Récupérer une prestation
 *     tags: [Prestation]
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation à récupérer
 *     responses:
 *       201:
 *         description: Prestations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */




/**
 * @swagger
 * /prestations:
 *   post:
 *     summary: Enregistrer une prestation en BDD
 *     tags: [Prestation]
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
 *               reparationType:
 *                 type: string
 *               priceSuggested:
 *                 type: string
 *             required:
 *               - categorie
 *               - clothType
 *               - reparationType
 *               - priceSuggested
 *     responses:
 *       200:
 *         description: prestation créée avec succès
 *       401:
 *         description: Prestation existe déja en BDD
 *       403:
 *         description: Token manquant ou invalide 
 *       500:
 *         description: Erreur interne du serveur
 */






/**
 * @swagger
 * /prestations/{id_prestation}:
 *   put:
 *     summary: Modifier une prestation par l'admin
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation à modifier
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
 *               reparationType:
 *                 type: string
 *               priceSuggested:
 *                 type: string
 *             required:
 *               - categorie
 *               - clothType
 *               - reparationType
 *               - priceSuggested
 *     responses:
 *       201:
 *         description: Prestation mise à jour avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucune prestation trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer une prestation par l'admin
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prestation à supprimer
 *     responses:
 *       201:
 *         description: Prestation supprimée avec succès
 *       403:
 *         description: token manquant ou invalide
 *       404:
 *         description: Aucune inprestationfo trouvée
 *       500:
 *         description: Erreur interne du serveur
 */