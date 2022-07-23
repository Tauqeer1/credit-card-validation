require('dotenv').config();

// config.js
module.exports = {
  app: {
    port: process.env.DEV_APP_PORT || '3000',
    appName: process.env.APP_NAME || 'Payment',
    env: process.env.NODE_ENV || 'development',
  },
  db: {
    port: process.env.DB_PORT || 5432,
    // database: process.env.DB_NAME || 'PaymentDb',
    database: process.env.DB_NAME || 'test',
    password: process.env.DB_PASS || 'postgres123',
    username: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: true,
  },
};
