import createError from 'http-errors';
import Destination from '../models/destination.model.js';
import logger from '../utilities/logger.js';

export const addDestinations = async (req, res, next) => {
  try {
    let { destinations } = req.body;

    // If the request contains a single object, convert it into an array
    if (!Array.isArray(destinations)) {
      destinations = [destinations]; // Wrap it in an array
    }

    if (destinations.length === 0) {
      return res
        .status(400)
        .json({ message: 'Invalid or empty destinations data' });
    }

    await Destination.insertMany(destinations);

    res.status(201).json({ message: 'Destinations added successfully' });
  } catch (error) {
    logger.error(`Error adding Destinations to MongoDB, ${error.message}`);
    next(error);
  }
};

export const getRandomDestinations = async (req, res, next) => {
  try {
    const count = await Destination.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(randomIndex);
    const dataTobeSent = {
      id: destination.id,
      clues: destination.clues,
      options: destination.options,
    };
    res.status(200).json(dataTobeSent);
  } catch (error) {
    logger.error(`Error fetching Random Destinations: ${error.message}`);
    next(error);
  }
};

export const checkCorrectDestination = async (req, res, next) => {
  try {
    const { id, selectedCity } = req.body;
    const findCityById = await Destination.findOne({ id: id });

    if (!findCityById) {
      return next(createError.NotFound('Question not found!'));
    }
    if (findCityById.city !== selectedCity) {
      res.status(200).send({ message: `Incorrect destination` });
    } else {
      const sendData = {
        fun_fact: findCityById.fun_fact,
        trivia: findCityById.trivia,
      };
      res.status(200).send(sendData);
    }
  } catch (error) {
    logger.error(`Error processing request: ${error.message}`);
    next(error);
  }
};

export const getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    logger.error(`Error fetching Destinations: ${error.message}`);
    next(error);
  }
};
