require("dotenv").config()
const mongoose = require("mongoose");
const app=require('./app')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log("connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
