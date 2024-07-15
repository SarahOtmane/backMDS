/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: CRUD operations for managing newsletter subscriptions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Newsletter:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email address subscribed to the newsletter
 */

/**
 * @swagger
 * /newsletters:
 *   post:
 *     summary: Add an email to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Newsletter'
 *     responses:
 *       201:
 *         description: Successfully subscribed to the newsletter
 *       401:
 *         description: Email already subscribed to the newsletter
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /newsletters:
 *   get:
 *     summary: Retrieve all newsletter subscriptions
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all newsletter subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 personInscrits:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of emails from persons subscribed to the newsletter
 *                 emailsInscrits:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Newsletter'
 *                   description: List of emails directly subscribed to the newsletter
 *       404:
 *         description: No subscriptions found
 *       500:
 *         description: Internal server error
 */
