const csvParser = require('./src/csvParser'); // Adjust the path
const jsonParser = require('./src/JsonParser');

async function processCSVData(csv) {
  try {
    const data = await csvParser.parseCSV(csv);
    console.log(data);
    // Perform further processing or database upload here
  } catch (error) {
    console.error('Error parsing CSV:', error.message);
  }
}

async function processJSONData(json) {
    try {
      const data = await jsonParser.parseJSON(json);
      console.log('Parsed data:', data);
      // Perform further processing or database upload here
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  }

// Extract function name and argument
const functionName = process.argv[2];
const argument = process.argv[3];

// Call the specified function with the provided argument
switch (functionName) {
  case 'csv':
    processCSVData(argument);
    break;
  case 'json':
    processJSONData(argument);
    break;
  default:
    console.error(`Error: Unknown function '${functionName}'`);
    process.exit(1);
}