const { createSetupIntent } = require("../services/stripe.service");

/**
 * Endpoint para crear un SetupIntent
 */
async function createSetupIntentController(req, res) {
    try {
        const setupIntent = await createSetupIntent();
        res.json({ client_secret: setupIntent.client_secret });
    } catch (err) {
        console.error("Error creando SetupIntent:", err);
        res.status(500).json({ error: "Error creando SetupIntent" });
    }
}

/**
 * Endpoint para "guardar" el payment_method (aquí solo lo mostramos en consola)
 */
async function savePaymentMethodController(req, res) {
    try {
        const { payment_method } = req.body;

        if (!payment_method) {
            return res.status(400).json({ error: "payment_method es requerido" });
        }

        // Aquí podrías guardar en tu BD (user_id + payment_method)
        console.log("Método de pago guardado:", payment_method);

        res.json({ success: true });
    } catch (err) {
        console.error("Error guardando método de pago:", err);
        res.status(500).json({ error: "Error guardando método de pago" });
    }
}

module.exports = {
    createSetupIntentController,
    savePaymentMethodController
};
