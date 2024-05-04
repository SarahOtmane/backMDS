/**
 * @swagger
 * tags:
 *   name: Info
 *   description: CRUD pour la gestion des info
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Info:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'info
 *         name:
 *           type: string
 *           description: Titre / Nom de l'info
 *         content:
 *           type: string
 *           description: Contenu de l'info
 */