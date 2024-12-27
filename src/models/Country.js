import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const Country = mongoose.model('countries', countrySchema);

export default Country;