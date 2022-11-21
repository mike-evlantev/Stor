import mongoose from "mongoose";
import Inc from "mongoose-sequence";
import { imageSchema } from "./shared/imageSchema.js";
const AutoIncrement = Inc(mongoose); 

const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    images: [imageSchema],
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
  }
);

const address = mongoose.Schema(
  {
    city: {type: String, required: false},
    line1: {type: String, required: false},
    line2: {type: String, required: false},
    postal_code: {type: String, required: false},
    state: {type: String, required: false}
  }
);

const billingDetails = mongoose.Schema(
  {
    address: address,
    email: {type: String, required: false},
    name: {type: String, required: false},
    phone: {type: String, required: false}
  }
);

const paymentMethod = mongoose.Schema(
  {
    id: { type: String, required: true },
    card: card,
    billing_details: billingDetails
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
    icon: { type: String, required: false },
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
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
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

// Duplicate the ID field.
orderSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
orderSchema.set('toJSON', {
  virtuals: true
});

orderSchema.plugin(AutoIncrement, {inc_field: 'orderNumber', start_seq: 1000000000});

export default mongoose.model("Order", orderSchema);
