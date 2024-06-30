const Info = require('../models/infoModel.js');
const Job = require('../models/jobModel.js');
const Newsletter = require('../models/newsletterModel.js');
const Cloth = require('../models/clothModel.js');
const Prestation = require('../models/prestationModel.js');
const Person = require('../models/personModel.js');


async function createTablesInOrder() {
    try {
        await Info.sync();
        await Job.sync();
        await Newsletter.sync();
        await Cloth.sync();
        await Prestation.sync();
        await Person.sync();

        console.log('Tables crées');
    } catch (error) {
        console.error("Erreur lors de la création des tables :", error);
    }
}

module.exports = createTablesInOrder;