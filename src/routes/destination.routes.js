import { Router } from 'express';
import {
  getDestinations,
  getRandomDestinations,
  addDestinations,
  checkCorrectDestination,
} from '../controllers/destination.controller.js';
import { validateDestinations } from '../validations/destinations.validations.js';

const router = Router();

router.get('/get/all', getDestinations);
router.get('/get/random', getRandomDestinations);

router.post('/add', validateDestinations, addDestinations);
router.post('/check-destination', checkCorrectDestination);

export default router;
