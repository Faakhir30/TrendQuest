import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const {email, Password, phone , address} = req.body;
    if (!address) return res.send({message:"address is required"});
    if (!email) return res.send({message: "email is required"});
    if (!Password) return res.send({message: "Password is required"});
    if (!phone) return res.send({message:"phone is required"});

    const user = await userModel.findOne({ email });
    if (user)
      return res.status(201).send({
        success: false,
        message: "already registered!",
      });
    const hash = await hashPassword(Password);
    const User = await new userModel({
      address,
      email,
      phone,
      password: hash,
    }).save();

    res.status(200).send({
      success: true,
      message: "sucesfully registered!",
      User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, Password } = req.body;
    if (!email)
      return res
        .status(404)
        .send({ success: false, message: "email required" });
    if (!Password)
      return res
        .status(404)
        .send({ success: false, message: "Password required" });
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "email not registered" });
      
        const pass =await comparePassword(Password, user.password)
    if (!(pass))
      return res
        .status(404)
        .send({ success: false, message: "Password Mismatch" });
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "logged in!",
      user: {
        address: user.address,
        password: user.password,
        email: user.email,
        phone: user.phone,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error logging in!",
      error,
    });
  }
};


export const testController = (req, res)=>{
    res.send('route acesed')
}

export const updateProfileController = async (req, res) => {
  try {
    const { email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 2) {
      return res.json({ error: "Passsword is required and 2 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        email:email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,role:user.role,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};


export const getOrdersController=  async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};