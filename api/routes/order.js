const {
  VerifyTokenAndAdmin,
  VerifyToken,
  VerifyTokenAndAuth,
} = require("../JWT");
const Order = require("../models/Order");

const router = require("express").Router();

// Get Monthly Income

router.get("/income", VerifyTokenAndAdmin, async (req, res) => {
    const productId=req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    console.log(lastMonth);
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      console.log(income);
      res.status(200).json(income);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//CREATE
router.post("/", VerifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", VerifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", VerifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Order Deleted....",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Users Orders
router.get("/:userId", VerifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Cart.find({ userId: req.params.userId });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Orders

router.get("/", VerifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router; 
