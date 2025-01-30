import mongoose, { Document, Schema } from "mongoose";

// Define the interface extending Document
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  accepted?: any[];
  rejected?: any[];
  response?: string;
  ehlo?: any[];
  envelopeTime: number;
  messageTime?: number;
  messageSize?: number;
  messageId?: string;
}

// Create the schema
const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accepted: {
    type: [Schema.Types.Mixed],
    default: null,
  },
  rejected: {
    type: [Schema.Types.Mixed],
    default: null,
  },
  ehlo: {
    type: [Schema.Types.Mixed],
    default: null,
  },
  envelopeTime: {
    type: Number,
    default: 0,
  },
  response: {
    type: String,
    default: null,
  },
  messageTime: {
    type: Number,
    default: 0,
  },
  messageSize: {
    type: Number,
    default: 0,
  },
  messageId: {
    type: Number,
    default: 0,
  },
});

// Create and export the model
const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
