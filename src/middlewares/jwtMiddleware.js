const jwt = require('jsonwebtoken');
require('dotenv').config();

//fonction pour vérifier les token d'un utilisateur
exports.verifyTokenUser = async(req, res, next) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            token = token.replace(/^Bearer\s+/, '');
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            next();
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}



//fonction pour vérifier les token d'un artisan
exports.verifyTokenArtisan = async(req, res, next) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            token = token.replace(/^Bearer\s+/, '');
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.artisan = payload;
            next();
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}




// Fonction pour vérifier si l'utilsateur est admin
exports.isAdmin = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token != undefined) {
            token = token.replace(/^Bearer\s+/, '');
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            // Vérification du rôle admin
            if (payload && payload.role && payload.role === 'admin') {
                next(); // Si l'utilisateur est admin, continuer
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