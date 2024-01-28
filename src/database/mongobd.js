const mongoose = require('mongoose');

async function connectToMongoDB(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message);
    throw error;
  }
}

async function uploadDataToMongoDB(data, collectionName) {
  try {
    const db = mongoose.connection;
    
    // Check if the collection exists; if not, create it
    if (!db.collections[collectionName]) {
      await db.createCollection(collectionName);
    }

    const collection = db.collection(collectionName);

    // Insert data into MongoDB
    await collection.insertMany(data);
    console.log(`Data uploaded to MongoDB collection '${collectionName}'`);
  } catch (error) {
    console.error('Error uploading data to MongoDB:', error.message);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
  uploadDataToMongoDB,
};