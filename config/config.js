require('dotenv').config({
  path: require('path').join(__dirname, '..', `${process.env.NODE_ENV}.env`)
});

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
};