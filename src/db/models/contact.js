import { model, Schema } from 'mongoose';

const emailValidator = {
  validator: function (v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  },
  message: (props) => `${props.value} is not a valid email address!`,
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: emailValidator,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = model('contacts', contactSchema);
