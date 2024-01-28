
const { createPool } = require('mysql2/promise');


async function connectToMySQL(config) {
  try {
    const pool = createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    console.log('Connected to MySQL');
    return pool;
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
    throw error;
  }
}

async function disconnectFromMySQL(pool) {
  try {
    await pool.end();
    console.log('Disconnected from MySQL');
  } catch (error) {
    console.error('Error disconnecting from MySQL:', error.message);
    throw error;
  }
}

async function uploadDataToMySQL(pool, data, tableName) {
  try {
    if (data.length === 0) {
      console.error('Error: No data to upload.');
      return;
    }

    const columns = Object.keys(data[0]);

    // Create the table if it doesn't exist
    await createTableIfNotExists(pool, tableName, columns);

    // Insert data into MySQL
    const placeholders = Array.from({ length: columns.length }, () => '?').join(',');
    const values = data.map((row) => columns.map((column) => row[column]));
    await pool.execute(`INSERT INTO ${tableName} (${columns.join(',')}) VALUES ${values.map(() => `(${placeholders})`).join(',')}`, values.flat());
    
    console.log(`Data uploaded to MySQL table '${tableName}'`);
  } catch (error) {
    console.error('Error uploading data to MySQL:', error.message);
    throw error;
  }
}

async function createTableIfNotExists(pool, tableName, columns) {
  try {
    // Check if the table exists; if not, create it
    const [rows, fields] = await pool.execute(`SHOW TABLES LIKE '${tableName}'`);
    if (rows.length === 0) {
      const columnDefinitions = columns.map((column) => `${column} VARCHAR(255)`).join(',');
      await pool.execute(`CREATE TABLE ${tableName} (${columnDefinitions})`);
    }
  } catch (error) {
    console.error('Error creating table in MySQL:', error.message);
    throw error;
  }
}

module.exports = {
  connectToMySQL,
  disconnectFromMySQL,
  uploadDataToMySQL,
};
