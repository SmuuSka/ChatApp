const mariadb = require('mariadb');
const config = require('./utils/config');

const pool = mariadb.createPool(config.sql);

module.exports = pool;


