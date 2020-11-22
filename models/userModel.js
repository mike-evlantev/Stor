import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  middleName: {
    type: String,
    require: false
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  isActive: {
    type: Boolean,
    default: true,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
    require: false,
  }
}, {
  timestamps: true
});

export default mongoose.model("user", UserSchema);