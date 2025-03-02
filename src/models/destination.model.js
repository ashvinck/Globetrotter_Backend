import mongoose, { Schema } from 'mongoose';

const DestinationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  city: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  clues: [{ type: String, required: true }],
  fun_fact: [{ type: String, required: true }],
  trivia: [{ type: String, required: true }],
  options: [{ type: String, required: true }],
});

const Destination = mongoose.model('Destination', DestinationSchema);

export default Destination;
