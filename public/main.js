// Usa aquí tu PUBLISHABLE KEY de Stripe (pk_test_...)
const stripe = Stripe("pk_test_51SXyJjPVAhaLDTCcR4f74QkwKuCyuEjffM5qNDgEROkZSOu5R0O42ulOL3p56uJQLBNZ0drjg4rWMHhBLvp3w26z00Tb63B9Yx");

// Crear elementos
const elements = stripe.elements();
const card = elements.create("card", {
    style: {
        base: {
            color: "#f5e8e2",
            fontSize: "16px",
            "::placeholder": { color: "#b49999" }
        },
        invalid: {
            color: "#ff5c6c"
        }
    }
});
card.mount("#card-element");

const form = document.getElementById("payment-form");
const message = document.getElementById("payment-message");
const submitBtn = document.getElementById("submit");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "";
    submitBtn.disabled = true;

    try {
        // 1) Pedimos un SetupIntent al backend
        const res = await fetch("/api/create-setup-intent", { method: "POST" });
        const data = await res.json();

        if (!data.client_secret) {
            throw new Error("No se recibió client_secret del servidor");
        }

        const clientSecret = data.client_secret;

        // 2) Confirmamos la tarjeta con Stripe
        const { setupIntent, error } = await stripe.confirmCardSetup(
            clientSecret,
            {
                payment_method: {
                    card: card
                }
            }
        );

        if (error) {
            message.textContent = "❌ " + error.message;
            submitBtn.disabled = false;
            return;
        }

        // 3) Enviamos el payment_method al backend para "guardar" la tarjeta
        await fetch("/api/save-payment-method", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                payment_method: setupIntent.payment_method
            })
        });

        message.textContent = "✅ Tarjeta guardada con éxito";
    } catch (err) {
        console.error(err);
        message.textContent = "❌ Error al procesar la tarjeta";
    } finally {
        submitBtn.disabled = false;
    }
});
