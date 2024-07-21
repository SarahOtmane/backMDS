/**
 * @swagger
 * tags:
 *   name: Prestation
 *   description: CRUD operations for managing prestations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Prestation:
 *       type: object
 *       required:
 *         - reparationType
 *         - priceSuggested
 *         - name_job
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the prestation
 *         reparationType:
 *           type: string
 *           description: The type of reparation for the prestation
 *         priceSuggested:
 *           type: integer
 *           description: The suggested price for the prestation
 *         name_job:
 *           type: string
 *           description: The job associated with the prestation
 */

/**
 * @swagger
 * /prestations:
 *   post:
 *     summary: Create a new prestation
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prestation'
 *     responses:
 *       201:
 *         description: Prestation created successfully
 *       401:
 *         description: Prestation already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /prestations:
 *   get:
 *     summary: Retrieve all prestations
 *     tags: [Prestation]
 *     responses:
 *       201:
 *         description: Prestations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: No prestations found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /prestations/{id_prestation}:
 *   get:
 *     summary: Retrieve a prestation by ID
 *     tags: [Prestation]
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prestation to retrieve
 *     responses:
 *       201:
 *         description: Prestation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: Prestation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /prestations/job/{name_job}:
 *   get:
 *     summary: Retrieve all prestations for a specific job
 *     tags: [Prestation]
 *     parameters:
 *       - in: path
 *         name: name_job
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the job to retrieve prestations for
 *     responses:
 *       201:
 *         description: Prestations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prestation'
 *       404:
 *         description: No prestations found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /prestations/{id_prestation}:
 *   put:
 *     summary: Update a prestation by ID
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prestation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prestation'
 *     responses:
 *       201:
 *         description: Prestation updated successfully
 *       404:
 *         description: Prestation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /prestations/{id_prestation}:
 *   delete:
 *     summary: Delete a prestation by ID
 *     tags: [Prestation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_prestation
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prestation to delete
 *     responses:
 *       201:
 *         description: Prestation deleted successfully
 *       404:
 *         description: Prestation not found
 *       500:
 *         description: Internal server error
 */
