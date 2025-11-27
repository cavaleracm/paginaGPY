const express = require("express");
const {
  createSetupIntentController,
  savePaymentMethodController
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-setup-intent", createSetupIntentController);
router.post("/save-payment-method", savePaymentMethodController);

module.exports = router;
