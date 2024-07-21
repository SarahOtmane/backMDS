/**
 * @swagger
 * tags:
 *   name: Job
 *   description: CRUD operations for managing jobs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The unique name of the job
 */


/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       401:
 *         description: Job already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve all jobs
 *     tags: [Job]
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       404:
 *         description: No jobs found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /jobs/{name_job}:
 *   delete:
 *     summary: Delete a job by name
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name_job
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the job to delete
 *     responses:
 *       201:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
