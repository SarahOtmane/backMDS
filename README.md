# Application de Gestion des Services

Cette application est une API RESTful pour la gestion des services, elle inclut : des utilisateurs, artisans, commandes, prestations, produits, témoignages, et abonnements à la newsletter. 

Elle est construite avec Node.js, Express, et utilise Sequelize pour l'ORM avec une base de données MySQL.





## Prérequis
- Docker et docker compose
- Node.js et npm




## Installation
1. Clonez le dépôt :
```bash
    git clone https://github.com/SarahOtmane/backMDS.git
    cd backMDS
```

2. Créer un fichier .env à la racine du projet.

3. Configurez les variables d'environnement dans le fichier .env :
```bash
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    EMAIL_ADDRESS=your_email_address
    EMAIL_PASSWORD=your_email_password
    JWT_KEY=your_jwt_secret
```





## Démarrage
Pour démarrer l'application :

1. Lancer docker desktop.

2. Exécuter cette commande : 
```bash
    docker-compose up
```

L'application sera disponible sur http://localhost:3004 et phpMyAdmin sur http://localhost:8081.


### Documentation de l'API
La documentation Swagger est disponible à l'adresse http://localhost:3004/api-docs.






## Structure du Projet
1. compose.yaml et compose.prod.yaml : fichiers pour la config docker.

2. .env : variables d'environnements

3. dossier src : 
- app.js : Point d'entrée de l'application.
- docs/swagger/config.js : Configuration Swagger pour la documentation API.
- docs/swagger : Documentation swagger pour chaque table
- middlewares : fonction midllewares
- routes/: Dossiers contenant les définitions des routes.
- models/: Dossiers contenant les modèles MySQL.
- controllers/: Dossier contenant les fonctions développées
- tests/ : Dossier des tests unitaires
- package.json : Dépendances du projet et scripts npm.


### Dépendances et versions 
- Version de NodeJs utilisée : v20.8.0
- Voici les dépendances utilisées dans ce projet et leurs versions respectives :
```bash
    {
      "dependencies": {
        "bcrypt": "^5.1.1",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "jsonwebtoken": "^9.0.2",
        "mysql2": "^3.9.7",
        "nodemailer": "^6.9.13",
        "sequelize": "^6.37.3",
        "swagger-jsdoc": "^6.2.8",
        "swagger-ui-express": "^5.0.0"
      },
      "devDependencies": {
        "nodemon": "^3.1.0",
        "supertest": "^7.0.0"
      }
    }
```

### Licence
Ce projet est sous licence ISC.