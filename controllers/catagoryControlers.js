import catagoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCatController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "name required" });
    const existingCat = await catagoryModel.findOne({ name });
    if (existingCat)
      return res.status(200).send({ message: "name already exists" });
    const catagory = await new catagoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      sucess: true,
      message: "cat created",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "Error in catagory",
    });
  }
};

export const allCatController = async (req, res) => {
  try {
    const cat = await catagoryModel.find({});
    res.status(200).send({
      sucess: true,
      message: "all catagories",
      cat,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ sucess: false, error, message: "error geting all cat" });
  }
};

export const catController = async (req, res) => {
  try {
    const cat = await catagoryModel.findById({ _id: req.params._id });
    res.status(200).send({ sucess: true, message: "found catagory", cat });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ sucess: false, error, message: "errorfound catagory" });
  }
};
export const deleteCatController = async (req, res)=>{
    try {
        await catagoryModel.findByIdAndDelete(req.params._id)
        res.status(200).send({ sucess: true, message: "deleted catagory"});

    } catch (error) {
        console.log(error)
        res
          .status(500)
          .send({ sucess: false, error, message: "error deleting cat" });
            
    }
}