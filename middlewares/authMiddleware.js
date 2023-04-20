import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const requiredSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode
    // console.log('passes');
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user,req.user)
    if (user.role !== 1)
      return res.status(401).send({
        sucess: false,
        message: "inauthorized Acess",
      });
    else next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
        sucess:false,
        err,message:"error in admin midleware"
    })
  }
};
