const environment = 'development'
const config = require('../config/knexfile')[environment];
module.exports = require('knex')(config);
