/**
 * @swagger
 * tags:
 *   name: Cloth
 *   description: CRUD operations for managing clothes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cloth:
 *       type: object
 *       required:
 *         - id
 *         - category
 *         - clothType
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the cloth
 *         category:
 *           type: string
 *           description: The category of the cloth
 *         clothType:
 *           type: string
 *           description: The type of the cloth
 *         name_job:
 *           type: string
 *           description: The job associated with the cloth
 */

/**
 * @swagger
 * /clothes:
 *   post:
 *     summary: Create a new cloth
 *     tags: [Cloth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cloth'
 *     responses:
 *       201:
 *         description: Cloth created successfully
 *       400:
 *         description: Job not found
 *       409:
 *         description: Cloth already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clothes:
 *   get:
 *     summary: Retrieve all clothes
 *     tags: [Cloth]
 *     responses:
 *       200:
 *         description: Clothes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cloth'
 *       404:
 *         description: No clothes found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clothes/{id_cloth}:
 *   get:
 *     summary: Get a cloth by ID
 *     tags: [Cloth]
 *     parameters:
 *       - in: path
 *         name: id_cloth
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cloth to retrieve
 *     responses:
 *       200:
 *         description: Cloth retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cloth'
 *       404:
 *         description: Cloth not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clothes/job/{name_job}:
 *   get:
 *     summary: Retrieve all clothes filtered by job
 *     tags: [Cloth]
 *     parameters:
 *       - in: path
 *         name: name_job
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the job
 *     responses:
 *       200:
 *         description: Clothes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cloth'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clothes/{id_cloth}:
 *   put:
 *     summary: Update an existing cloth
 *     tags: [Cloth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_cloth
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cloth to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cloth'
 *     responses:
 *       200:
 *         description: Cloth updated successfully
 *       400:
 *         description: Job not found
 *       404:
 *         description: Cloth not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clothes/{id_cloth}:
 *   delete:
 *     summary: Delete a cloth
 *     tags: [Cloth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_cloth
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cloth to delete
 *     responses:
 *       200:
 *         description: Cloth deleted successfully
 *       404:
 *         description: Cloth not found
 *       500:
 *         description: Internal server error
 */
