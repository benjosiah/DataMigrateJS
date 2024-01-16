const fs = require('fs');

/**
 * Parse a JSON file and return the data as an object.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<Object>} - A promise that resolves with the parsed data.
 */
function parseJSON(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

module.exports = {
  parseJSON,
};
