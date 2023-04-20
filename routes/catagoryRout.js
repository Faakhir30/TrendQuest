import express from "express";
import {
  allCatController,
  catController,
  createCatController,
  deleteCatController,
} from "../controllers/catagoryControlers.js";
import { isAdmin, requiredSignIn } from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-catagory", requiredSignIn, isAdmin, createCatController);
router.get("/get-catagories", allCatController);
router.get("/get-catagory/:_id", catController);
router.delete(
  "/delete-catagory/:_id",
  requiredSignIn,
  isAdmin,
  deleteCatController
);

export default router;
