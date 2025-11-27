const Stripe = require("stripe");
const { config } = require("../config/config");

const stripe = new Stripe(config.stripeSecretKey);

/**
 * Crea un SetupIntent para guardar una tarjeta
 */
async function createSetupIntent() {
  return stripe.setupIntents.create({});
}

module.exports = {
  stripe,
  createSetupIntent
};
