import express from "express";
import { body } from "express-validator";
import {
  checkEmail,
  signUpStep1,
  signUpStep2,
  resendCode,
  deleteAccount,
  login,
  checkUsername,
} from "../controllers/auth.ts";

const router = express.Router();

router.post("/check-email", checkEmail);
router.post('/check-username', checkUsername )
router.post('/login', login);

router.post(
  "/sign-up/step-1",
  [
    body("email").isEmail().withMessage("Enter valid email address"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
      .withMessage(
        "Password must contain at least one uppercase letter, one number and one special character"
      ),
  ],
  signUpStep1
);

router.post(
  "/sign-up/step-2",
  body("code")
    .isLength({ max: 6, min: 6 })
    .withMessage("Code must be 6 characters long"),
  signUpStep2
);

router.post("/resend-code", resendCode);

router.delete("/delete-account", deleteAccount);

export default router;
