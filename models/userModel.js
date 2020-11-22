import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: false,
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);