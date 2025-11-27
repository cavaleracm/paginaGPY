const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

module.exports = { config };
