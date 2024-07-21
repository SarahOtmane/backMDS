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
 *           type: string
 *           description: The postal code of the address
 *         country:
 *           type: string
 *           description: The country of the address
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *       401:
 *         description: Address already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /addresses/{id_address}:
 *   get:
 *     summary: Get an address by ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id_address
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the address to retrieve
 *     responses:
 *       200:
 *         description: Address retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       401:
 *         description: Address not found
 *       500:
 *         description: Internal server error
 */
