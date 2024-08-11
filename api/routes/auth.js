const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SaltKey
    ).toString(),
  });
  newUser.save((err, user) => {
    if (err) {
      res.statusCode = 500;
      res.json({
        success: false,
        err: err,
      });
      return;
    } else {
      const { password, ...others } = user._doc;
      res.status(201);
      res.json({
        success: true,
        user: others,
      });
    }
  });
});

//LOGIN

router.post("/login", async (req, res) => {
  
    User.findOne({
      username: req.body.username,
    }).then((user)=>{
      !user &&
      res.status(401).json({
        err: "User Not Found",
      });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SaltKey
    );

    const pass = hashedPassword.toString(CryptoJS.enc.Utf8);

    pass !== req.body.password &&
      res.status(401).json({
        err: "Wrong Password",
      });

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_Secret_Key,
      {
        expiresIn: "3d",
      }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({
      ...others,
      accessToken,
    });
    },
    (err) => console.log(err)
      
    ).catch((err)=>console.log(err));
    
  } 
);

module.exports = router;
