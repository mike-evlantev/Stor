import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose); 

const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product", // reference specific model
    },
  },
  {
    timestamps: true,
  }
);

const card = mongoose.Schema(
  {
    brand: { type: String, required: true },
    country: {type: String, required: false},
    exp_month: {type: Number, required: true},
    exp_year: {type: Number, required: true},
    funding: {type: String, required: true},
    last4: {type: String, required: true}    
  },
  {
    timestamps: true,
  }
);

const paymentMethod = mongoose.Schema(
  {
    id: { type: String, required: true },
    card: card
  },
  {
    timestamps: true,
  }
);

const addressSchema = mongoose.Schema(
  {
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const shippingOptionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    timeframe: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const orderSchema = mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      default: 0
    },
    first: {
      type: String,
      required: true,
    },
    middle: {
      type: String,
      required: false,
    },
    last: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // could be an unregistered guest user
      ref: "User", // reference specific model
    },
    orderItems: [orderItemSchema],
    subtotal: {
      type: Number,
      default: 0.0,
      required: true,
    },
    tax: {
      type: Number,
      default: 0.0,
      required: true,
    },
    total: {
      type: Number,
      default: 0.0,
      required: true,
    },
    shippingAddress: addressSchema,
    shippingOption: shippingOptionSchema,
    paymentMethod: paymentMethod,
    isDelivered: {
      type: Boolean,
      default: false,
      required: false,
    },
    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(AutoIncrement, {inc_field: 'orderNumber', start_seq: 1000000000});

export default mongoose.model("Order", orderSchema);
