import mongoose from "mongoose";

let contactApp = mongoose.Schema;

let schema = new contactApp({
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

let ContactApp = mongoose.model("contactApp", schema);

export default ContactApp;
