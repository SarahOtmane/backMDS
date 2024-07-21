/**
 * @swagger
 * tags:
 *   name: Command
 *   description: CRUD operations for managing commands
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Command:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - picture
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the command
 *         name:
 *           type: string
 *           description: The name of the command
 *         picture:
 *           type: string
 *           description: The picture associated with the command
 *         dateFinished:
 *           type: string
 *           format: date-time
 *           description: The date when the command was finished
 *         email_user:
 *           type: string
 *           description: The email of the user who made the command
 *         id_product:
 *           type: integer
 *           description: The identifier of the product associated with the command
 *         id_cloth:
 *           type: integer
 *           description: The identifier of the cloth associated with the command
 *         comment:
 *           type: string
 *           description: Additional comments for the command
 */

/**
 * @swagger
 * /commands/{id_artisan}:
 *   post:
 *     summary: Create a new command
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_artisan
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the artisan for whom the command is created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Command'
 *     responses:
 *       201:
 *         description: Command created successfully
 *       404:
 *         description: Artisan, cloth, or prestation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /commands:
 *   get:
 *     summary: Retrieve all commands (Admin)
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commands retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Command'
 *       404:
 *         description: No commands found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /commands/users:
 *   get:
 *     summary: Retrieve commands of the logged-in user
 *     tags: [Command]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commands retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Command'
 *       404:
 *         description: No commands found
 *       500:
 *         description: Internal server error
 */
