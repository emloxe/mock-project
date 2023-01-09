const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const {
  username,
  password,
  database,
  host,
  port,
  timezone,
  logging,
} = require('../config').db_config;

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging,
});

const modelDefiners = [
	// Add more models here...
	require('./models/MockGroup'),
	require('./models/MockList'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
