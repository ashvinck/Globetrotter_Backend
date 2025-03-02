import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log', level: 'error' }),
  ],
});

logger.stream = {
  write: (message) => logger.info(message.trim()),
};

export default logger;
