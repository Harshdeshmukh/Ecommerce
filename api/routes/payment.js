const {
  VerifyTokenAndAdmin
} = require("../JWT");

const router = require("express").Router();
const uuidv4 = require("uuid").v4;
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

const Razorpay=require('razorpay');

const razorpay=new Razorpay({
  key_id:process.env.Razorpay_KEY_ID,
  key_secret:process.env.Razorpay_SECRET
});

router.post("/stripe", async (req, res) => {
  const tokenId=req.body.tokenId;
  const amount=req.body.amount;
  stripe.charges.create(
    {
      source: tokenId,
      amount: amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr);
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

router.post("/razorpay",async(req, res)=>{
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount,
      currency: "INR",
      
    });
    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error});
  }

});
module.exports = router;
