import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product", // reference specific model
    },
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
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    // User removed to allow non-users to submit orders
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User", // reference specific model
    // },
    orderItems: [orderItemSchema],
    shippingAddress: addressSchema,
    paymentMethod: {
      type: String,
      required: true,
    },
    payPalPaymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxAmount: {
      type: Number,
      default: 0.0,
      required: true,
    },
    shippingOption: shippingOptionSchema,
    totalAmount: {
      type: Number,
      default: 0.0,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
