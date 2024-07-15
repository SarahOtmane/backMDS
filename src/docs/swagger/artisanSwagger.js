/**
 * @swagger
 * tags:
 *   name: Address
 *   description: CRUD operations for managing addresses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - id
 *         - streetAddress
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the address
 *         streetAddress:
 *           type: string
 *           description: The street address
 *         city:
 *           type: string
 *           description: The city of the address
 *         postalCode:
/**
 * @swagger
 * tags:
 *   name: Artisan
 *   description: CRUD operations for managing artisans
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Artisan:
 *       type: object
 *       required:
 *         - id
 *         - acceptNewOrder
 *         - siret
 *         - tva
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the artisan
 *         acceptNewOrder:
 *           type: boolean
 *           description: Whether the artisan accepts new orders
 *         siret:
 *           type: string
 *           description: The SIRET number of the artisan
 *         tva:
 *           type: string
 *           description: The TVA number of the artisan
 *         description:
 *           type: string
 *           description: The description of the artisan
 *         picture:
 *           type: string
 *           description: The picture of the artisan
 */

/**
 * @swagger
 * /artisans/{name_job}/{postalcode}:
 *   get:
 *     summary: Retrieve all artisans filtered by job and postal code
 *     tags: [Artisan]
 *     parameters:
 *       - in: path
 *         name: name_job
 *         required: true
 *         schema:
 *           type: string
 *         description: The job name
 *       - in: path
 *         name: postalcode
 *         required: true
 *         schema:
 *           type: string
 *         description: The postal code
 *     responses:
 *       200:
 *         description: Artisans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artisan'
 *       400:
 *         description: Job name not provided
 *       404:
 *         description: No artisans found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /artisans/{id_artisan}:
 *   get:
 *     summary: Retrieve the details of an artisan by ID
 *     tags: [Artisan]
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the artisan to retrieve
 *     responses:
 *       200:
 *         description: Artisan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artisan'
 *       404:
 *         description: No artisan found
 *       500:
 *         description: Internal server error
 */
