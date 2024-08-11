const {
  VerifyTokenAndAdmin,
} = require("../JWT");
const Product = require("../models/Product");

const router = require("express").Router();

//CREATE
router.post("/", VerifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", VerifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    
    
    res.status(200).json({success:true,product:updateProduct._doc});
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", VerifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success:true,
    });
  } catch (err) {
    res.status(500).json({success:false,error:err,});
  }
});

//Get Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Products
router.get("/", async (req, res) => {
  const qNew = req.query.new ? req.query.new : false;
  const qCategory = req.query.category ? req.query.category : false;
  try {
    let products;

    if (qNew) {
      products = await Product.find()
        .sort({
          createdAt: -1,
        });
    } else if (qCategory) {
      console.log(qCategory);
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
