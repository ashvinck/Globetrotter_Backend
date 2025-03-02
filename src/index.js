import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { rateLimit } from 'express-rate-limit';
import createHttpError from 'http-errors';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectToMongoDB } from './config/mongodb.js';
import logger from './utilities/logger.js';
// import { initializeSocketIO } from './config/socket.js';
import destinationRouter from './routes/destination.routes.js';
config();

// Initializing express App
const app = express();

const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   pingTimeout: 60000,
//   cors: {
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   },
// });

// app.set('io', io); // using set method to mount the `io` instance on the app to avoid usage of `global`

app.use(helmet());
// app.use(express.json({ limit: '16kb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// global middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(morgan('combined', { stream: logger.stream }));

// Rate Limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // // Limit each IP to 500 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    logger.warn(
      `Rate limit exceeded: ${req.ip} exceeded ${options.limit} requests in ${
        options.windowMs / 60000
      } minutes`
    );
    throw createHttpError(
      options.statusCode || 429,
      `Too many requests. Only ${options.limit} requests allowed per ${
        options.windowMs / 60000
      } minutes`
    );
  },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// initializeSocketIO(io);

app.get('/', function (request, response) {
  response.status(200).send('🙋‍♂️ Hello! Welcome to Globetrotter Backend!');
});

/////// Routes \\\\\\\
app.use('/destinations', destinationRouter);

// 404 Error Handling
app.use((req, res, next) => {
  logger.warn(`404 Not Found: ${req.originalUrl}`);
  next(new createHttpError.NotFound('The requested resource was not found'));
});
// Global Error Handler
const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.status || 500} - ${err.message}`);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
};

app.use(errorHandler);

// Start Server
const startServer = () => {
  httpServer.listen(process.env.PORT, () => {
    logger.info(`🚀 Server started on port ${process.env.PORT}`);
  });
};

// Graceful Shutdown
const shutdown = async () => {
  logger.info('🔴 Shutting down server...');
  try {
    await connectToMongoDB().disconnect();
    logger.info('MongoDB disconnected successfully.');
  } catch (error) {
    logger.error('Error disconnecting MongoDB:', error);
  }
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

connectToMongoDB()
  .then(() => startServer())
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
  });
