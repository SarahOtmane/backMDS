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
 *           description: The job name
 *       example:
 *         name: "Developer"
 * 
 * /jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 * 
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
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
 * 
 * /jobs/{name_job}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: name_job
 *         schema:
 *           type: string
 *         required: true
 *         description: The job name
 *     responses:
 *       201:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
