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

const creditCardPaymentResult = mongoose.Schema(
  {
    network: {
      type: String,
      enum: ["visa", "mastercard", "amex", "discover"],
      required: true,
    },
    last4: { type: String, required: true },
    status: {
      type: String,
      enum: ["success", "failed", "warning"],
      required: true,
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
    // User removed to allow non-users to submit orders
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User", // reference specific model
    // },
    orderItems: [orderItemSchema],
    taxAmount: {
      type: Number,
      default: 0.0,
      required: true,
    },
    totalAmount: {
      type: Number,
      default: 0.0,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit card", "paypal"],
      required: true,
    },
    creditCardPaymentResult: creditCardPaymentResult,
    payPalPaymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    shippingAddress: addressSchema,
    shippingOption: shippingOptionSchema,
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
