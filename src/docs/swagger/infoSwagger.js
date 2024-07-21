/**
 * @swagger
 * tags:
 *   name: Info
 *   description: CRUD operations for managing info entries
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Info:
 *       type: object
 *       required:
 *         - name
 *         - content
 *       properties:
 *         name:
 *           type: string
 *           description: The unique name of the info entry
 *         content:
 *           type: string
 *           description: The content of the info entry
 */

/**
 * @swagger
 * /infos:
 *   post:
 *     summary: Create a new info entry
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Info'
 *     responses:
 *       201:
 *         description: Info entry created successfully
 *       401:
 *         description: Info entry already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /infos:
 *   get:
 *     summary: Retrieve all info entries
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Info entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Info'
 *       404:
 *         description: No info entries found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /infos/{name_info}:
 *   get:
 *     summary: Get an info entry by name
 *     tags: [Info]
 *     parameters:
 *       - in: path
 *         name: name_info
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the info entry to retrieve
 *     responses:
 *       200:
 *         description: Info entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Info'
 *       404:
 *         description: Info entry not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /infos/{name_info}:
 *   put:
 *     summary: Update an existing info entry
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name_info
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the info entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Info'
 *     responses:
 *       200:
 *         description: Info entry updated successfully
 *       404:
 *         description: Info entry not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /infos/{name_info}:
 *   delete:
 *     summary: Delete an info entry
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name_info
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the info entry to delete
 *     responses:
 *       200:
 *         description: Info entry deleted successfully
 *       404:
 *         description: Info entry not found
 *       500:
 *         description: Internal server error
 */
