exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const { payment_method } = body;

        if (!payment_method) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "payment_method es requerido" })
            };
        }

        // Aquí podrías guardar en BD, por ahora solo lo mostramos en logs
        console.log("Método de pago recibido:", payment_method);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (err) {
        console.error("Error guardando método de pago:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error guardando método de pago" })
        };
    }
};
