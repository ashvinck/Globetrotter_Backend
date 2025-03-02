import mongoose from 'mongoose';
import { config } from 'dotenv';
import createError from 'http-errors';
import logger from '../utilities/logger.js';

config();

const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;
export async function connectToMongoDB() {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI);
    logger.info('💾 Connected to MongoDB!');
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    throw createError.InternalServerError('Error connecting to MongoDB');
  }
}
