import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    stars: { type: Number, min: 1, max: 5, default: 4 },
    priceDiff: { type: Number, default: 0 },
  },
  { _id: false },
);

const activitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, default: 0, min: 0 },
    optional: { type: Boolean, default: false },
  },
  { _id: false },
);

const itinerarySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const transferSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Private', 'SIC'], required: true },
    price: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 },
    basePrice: { type: Number, required: true, min: 0 },

    hotels: { type: [hotelSchema], default: [] },
    activities: { type: [activitySchema], default: [] },
    itinerary: { type: [itinerarySchema], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    transfers: { type: transferSchema, default: () => ({ type: 'Private', price: 0 }) },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id?.toString?.() ?? String(ret._id);
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id?.toString?.() ?? String(ret._id);
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export default mongoose.model('Package', packageSchema);
