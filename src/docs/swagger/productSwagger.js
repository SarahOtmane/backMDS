/**
 * @swagger
 * tags:
 *   name: Product
 *   description: CRUD operations for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - price
 *         - id_artisan
 *         - id_prestation
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the product
 *         price:
 *           type: integer
 *           description: The price of the product
 *         id_artisan:
 *           type: integer
 *           description: The ID of the associated artisan
 *         id_prestation:
 *           type: integer
 *           description: The ID of the associated prestation
 */

/**
 * @swagger
 * /products/artisan/{id_artisan}:
 *   post:
 *     summary: Create a new product for an artisan
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the artisan to create the product for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       404:
 *         description: Artisan or prestation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/artisan/{id_artisan}:
 *   get:
 *     summary: Retrieve all products of an artisan
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the artisan to retrieve products for
 *     responses:
 *       201:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Artisan not found or no products found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id_product}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve
 *     responses:
 *       201:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id_product}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product updated successfully
 *       404:
 *         description: Product, artisan, or prestation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id_product}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to delete
 *     responses:
 *       201:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id_artisan}/{id_prestation}:
 *   get:
 *     summary: Retrieve a product linked to a specific artisan and prestation
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the artisan
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prestation
 *     responses:
 *       201:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Artisan or prestation not found
 *       500:
 *         description: Internal server error
 */
