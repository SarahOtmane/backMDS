const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtMiddleware {
    constructor() {
        this.token = undefined;
        this.verifyTokenUser = this.verifyTokenUser.bind(this);
        this.verifyTokenArtisan = this.verifyTokenArtisan.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    async verifyToken() {
        return new Promise((resolve, reject) => {
            jwt.verify(this.token, process.env.JWT_KEY, (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    async verifyTokenUser(req, res, next) {
        try {
            this.token = req.headers['authorization'];
            if (this.token !== undefined) {
                this.token = this.token.replace(/^Bearer\s+/, '');
                const payload = await this.verifyToken();
                req.user = payload;

                if (payload && payload.role === 'user') {
                    next();
                } else {
                    res.status(403).json({ message: "Accès interdit: rôle user requis" });
                }
            } else {
                res.status(403).json({ message: "Accès interdit: token manquant" });
            }
        } catch (error) {
            console.log(error);
            res.status(403).json({ message: "Accès interdit: token invalide" });
        }
    }

    async verifyTokenArtisan(req, res, next) {
        try {
            this.token = req.headers['authorization'];
            if (this.token !== undefined) {
                this.token = this.token.replace(/^Bearer\s+/, '');
                const payload = await this.verifyToken();
                req.artisan = payload;

                if (payload && payload.role === 'artisan') {
                    next();
                } else {
                    res.status(403).json({ message: "Accès interdit: rôle artisan requis" });
                }
            } else {
                res.status(403).json({ message: "Accès interdit: token manquant" });
            }
        } catch (error) {
            console.log(error);
            res.status(403).json({ message: "Accès interdit: token invalide" });
        }
    }

    async isAdmin(req, res, next) {
        try {
            this.token = req.headers['authorization'];
            if (this.token !== undefined) {
                this.token = this.token.replace(/^Bearer\s+/, '');
                const payload = await this.verifyToken();
                req.user = payload;

                if (payload && payload.role === 'admin') {
                    next();
                } else {
                    res.status(403).json({ message: "Accès interdit: rôle administrateur requis" });
                }
            } else {
                res.status(403).json({ message: "Accès interdit: token manquant" });
            }
        } catch (error) {
            console.log(error);
            res.status(403).json({ message: "Accès interdit: token invalide" });
        }
    }
}

module.exports = JwtMiddleware;
