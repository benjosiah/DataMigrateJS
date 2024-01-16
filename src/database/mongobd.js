const mongoose = require('mongoose');

/**
 * Connect to a MongoDB database using Mongoose.
 * @param {string} connectionString - The MongoDB connection string.
 * @returns {Promise<mongoose.Connection>} - A promise that resolves with the Mongoose connection.
 */
async function connectToMongoDB(connectionString) {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB using Mongoose');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB using Mongoose:', error.message);
    throw error;
  }
}

/**
 * Create a Mongoose schema for MongoDB based on the provided schema.
 * @param {Object} schema - The MongoDB schema with field names and types.
 * @returns {mongoose.Schema} - The Mongoose schema.
 */
function createMongoDBSchema(schema) {
  return new mongoose.Schema(schema);
}

/**
 * Create a Mongoose model for MongoDB based on the provided schema.
 * @param {string} modelName - The name of the Mongoose model.
 * @param {mongoose.Schema} schema - The Mongoose schema.
 * @returns {mongoose.Model} - The Mongoose model.
 */
function createMongoDBModel(modelName, schema) {
  return mongoose.model(modelName, schema);
}

/**
 * Insert data into a MongoDB collection.
 * @param {mongoose.Model} model - The Mongoose model for the collection.
 * @param {Array} data - The data to insert into the collection.
 * @returns {Promise<void>} - A promise that resolves when the insertion is complete.
 */
async function insertIntoMongoDB(model, data) {
  try {
    await model.insertMany(data);
    console.log('Data inserted into MongoDB using Mongoose');
  } catch (error) {
    console.error('Error inserting data into MongoDB using Mongoose:', error.message);
    throw error;
  }
}

/**
 * Disconnect from the MongoDB database.
 * @param {mongoose.Connection} connection - The Mongoose connection.
 * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
 */
async function disconnectFromMongoDB(connection) {
  try {
    await connection.close();
    console.log('Disconnected from MongoDB using Mongoose');
  } catch (error) {
    console.error('Error disconnecting from MongoDB using Mongoose:', error.message);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  createMongoDBSchema,
  createMongoDBModel,
  insertIntoMongoDB,
  disconnectFromMongoDB,
};
