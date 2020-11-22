import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
},{
  timestamps: true
});

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // reference specific model
  },
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  avgRating: {
    type: Number,
    require: true,
    default: 0
  },
  reviews: [reviewSchema],
  numReviews: {
    type: Number,
    require: true,
    default: 0
  },
  price: {
    type: Number,
    require: true,
    default: 0
  },
  countInStock: {
    type: Number,
    require: true,
    default: 0
  },
}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);