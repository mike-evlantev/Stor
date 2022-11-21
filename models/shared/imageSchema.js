import mongoose from 'mongoose';

export const imageSchema = mongoose.Schema({
    url: {type: String, required: true},
    sort: {type: Number, required: true}
  },{
    timestamps: true
  });