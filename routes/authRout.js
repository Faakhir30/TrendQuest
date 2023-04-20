import express from "express";
import {
  getOrdersController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requiredSignIn, isAdmin, testController);
router.get("/user-auth", requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put('/profile', requiredSignIn, updateProfileController)
router.get('/orders', requiredSignIn, getOrdersController)
export default router;