const { createPool } = require('mysql2/promise');

/**
 * Create a connection pool for a MySQL database.
 * @param {string} connectionString - The MySQL connection string.
 * @returns {Object} - The MySQL connection pool.
 */
function createMySQLPool(connectionString) {
  return createPool({ connectionString });
}

/**
 * Create a MySQL table based on the provided schema.
 * @param {Object} pool - The MySQL connection pool.
 * @param {string} tableName - The name of the table.
 * @param {Object} schema - The table schema with column names and types.
 * @returns {Promise<void>} - A promise that resolves when the table is created.
 */
async function createMySQLTable(pool, tableName, schema) {
  try {
    const connection = await pool.getConnection();
    let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
    
    // Dynamically create columns based on the schema
    Object.entries(schema).forEach(([columnName, columnType]) => {
      createTableQuery += `${columnName} ${columnType}, `;
    });
    
    createTableQuery = createTableQuery.slice(0, -2); // Remove the trailing comma and space
    createTableQuery += ');';
    
    await connection.query(createTableQuery);
    console.log(`Table '${tableName}' created in MySQL`);
    connection.release();
  } catch (error) {
    console.error(`Error creating table in MySQL: ${error.message}`);
    throw error;
  }
}

/**
 * Insert data into a MySQL table.
 * @param {Object} pool - The MySQL connection pool.
 * @param {string} tableName - The name of the table.
 * @param {Array} data - The data to insert into the table.
 * @returns {Promise<void>} - A promise that resolves when the insertion is complete.
 */
async function insertIntoMySQL(pool, tableName, data) {
  try {
    const connection = await pool.getConnection();
    await connection.query(`INSERT INTO ${tableName} VALUES ?`, [data]);
    console.log('Data inserted into MySQL');
    connection.release();
  } catch (error) {
    console.error('Error inserting data into MySQL:', error.message);
    throw error;
  }
}

/**
 * Close the MySQL connection pool.
 * @param {Object} pool - The MySQL connection pool.
 * @returns {Promise<void>} - A promise that resolves when the pool is closed.
 */
async function closeMySQLPool(pool) {
  try {
    await pool.end();
    console.log('Closed MySQL connection pool');
  } catch (error) {
    console.error('Error closing MySQL connection pool:', error.message);
    throw error;
  }
}

module.exports = {
  createMySQLPool,
  createMySQLTable,
  insertIntoMySQL,
  closeMySQLPool,
};
