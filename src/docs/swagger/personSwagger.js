/**
 * @swagger
 * tags:
 *   name: Person
 *   description: CRUD operations for managing users and artisans
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the person
 *         password:
 *           type: string
 *           description: The hashed password of the person
 *         role:
 *           type: string
 *           description: The role of the person (user, admin, artisan)
 *         firstname:
 *           type: string
 *           description: The first name of the person
 *         lastname:
 *           type: string
 *           description: The last name of the person
 *         mobile:
 *           type: string
 *           description: The mobile number of the person
 *         subscribeNewsletter:
 *           type: boolean
 *           description: Whether the person is subscribed to the newsletter
 *         id_address:
 *           type: integer
 *           description: The ID of the associated address
 *         id_artisan:
 *           type: integer
 *           description: The ID of the associated artisan details
 */

/**
 * @swagger
 * /persons/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 *       401:
 *         description: Invalid role for user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/artisan/register:
 *   post:
 *     summary: Register a new artisan
 *     tags: [Person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: Artisan registered successfully
 *       409:
 *         description: Email already exists
 *       401:
 *         description: Invalid role for artisan
 *       404:
 *         description: Job or prestation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/login:
 *   post:
 *     summary: Login a person
 *     tags: [Person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Person logged in successfully
 *       401:
 *         description: Incorrect email or password
 *       404:
 *         description: Person not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/user:
 *   get:
 *     summary: Retrieve the logged-in user details
 *     tags: [Person]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/user:
 *   put:
 *     summary: Update the logged-in user details
 *     tags: [Person]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/user/password:
 *   put:
 *     summary: Update the logged-in user password
 *     tags: [Person]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - password
 *     responses:
 *       201:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Incorrect old password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/artisan:
 *   get:
 *     summary: Retrieve the logged-in artisan details
 *     tags: [Person]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Artisan details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Artisan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/artisan:
 *   put:
 *     summary: Update the logged-in artisan details
 *     tags: [Person]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: Artisan details updated successfully
 *       404:
 *         description: Artisan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /persons/artisan/password:
 *   put:
 *     summary: Update the logged-in artisan password
 *     tags: [Person]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - password
 *     responses:
 *       201:
 *         description: Password updated successfully
 *       404:
 *         description: Artisan not found
 *       400:
 *         description: Incorrect old password
 *       500:
 *         description: Internal server error
 */
