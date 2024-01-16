
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define log formatting
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create a logger
const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Add transports as needed (console, file, etc.)
    new transports.Console(),
    // Add more transports here if necessary
  ],
});

module.exports = logger;