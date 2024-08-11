const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth"); 
const productRoute=require("./routes/product");
const cartRoute=require("./routes/cart");
const orderRoute=require("./routes/order");
const paymentRoute = require("./routes/payment");
const cors = require("cors");


mongoose.connect(
  process.env.MONGO_URL
).then(()=>console.log("DB connecion successful")
).catch((e)=>console.log(e));
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout", paymentRoute);
app.get("/api/test",()=>{
    console.log("Hello World!");
});


app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running");
});


