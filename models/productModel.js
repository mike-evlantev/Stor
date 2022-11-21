import mongoose from 'mongoose';
import { imageSchema } from './shared/imageSchema.js';

const reviewSchema = mongoose.Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
},{
  timestamps: true
});

const productSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // reference specific model
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  images: [imageSchema],
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  avgRating: {
    type: Number,
    required: true,
    default: 0
  },
  reviews: [reviewSchema],
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
}, {
  timestamps: true
});

// Duplicate the ID field.
productSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
  virtuals: true
});

export default mongoose.model("Product", productSchema);