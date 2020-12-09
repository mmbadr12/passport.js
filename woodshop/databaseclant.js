const Redshift = require('node-redshift');

const clientCredentials = {
  host: process.env.REDSHIFT_HOST,
  port: process.env.REDSHIFT_PORT,
  database: process.env.REDSHIFT_DATABASE,
  user: process.env.REDSHIFT_DB_USER,
  password: process.env.REDSHIFT_DB_PASSWORD,
};
 
const redshiftClient = new Redshift(clientCredentials);

module.exports = redshiftClient;