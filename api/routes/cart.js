const {
  VerifyTokenAndAdmin,
  VerifyToken,
  VerifyTokenAndAuth,
} = require("../JWT");
const Cart = require("../models/Cart");

const router = require("express").Router();

//CREATE
router.post("/", VerifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", VerifyTokenAndAuth, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", VerifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Cart Deleted....",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Cart
router.get("/:userId", VerifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Carts

router.get("/", VerifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
