const { createLogger, format, transports } = require('winston')
const { combine, colorize, timestamp, errors, printf } = format

const outputFormat = printf((info) => {
  if (info.stack) {
    return `[${info.timestamp}] [${info.level}]: ${info.stack}`
  }
  return `[${info.timestamp}] [${info.level}]: ${info.message}`
})

module.exports = createLogger({
  format: combine(
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    outputFormat
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error']
    })
  ],
  exceptionHandlers: [
    new transports.Console({
      stderrLevels: ['error']
    })
  ]
})
