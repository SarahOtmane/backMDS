const jwt = require('jsonwebtoken');
require('dotenv').config();

//fonction pour vérifier le token d'un utilisateur
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

            req.person = payload;

            // Vérification du rôle user
            if (payload && payload.role === 'user') {
                next(); 
            } else {
                res.status(403).json({ message: "Accès interdit: rôle user requis" });
            }
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

            // Vérification du rôle artisan
            if (payload && payload.role === 'artisan') {
                next(); 
            } else {
                res.status(403).json({ message: "Accès interdit: rôle artisan requis" });
            }
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