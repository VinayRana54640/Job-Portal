import { Cashfree, CFEnvironment } from "cashfree-pg";
const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION, // use Cashfree.PRODUCTION for live
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);
export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, orderAmount, customerId, customerEmail, customerPhone } =
      body;

    // Initialize Cashfree SDK

    // Create order
    const response = await cashfree.PGCreateOrder({
      order_amount: orderAmount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id=${orderId}`,
      },
    });
    let paymentSessionId = response.data?.payment_session_id;
    if (!paymentSessionId) {
      throw new Error("payment_session_id is missing in Cashfree response");
    }
    return new Response(
      JSON.stringify({ orderId, payment_session_id: paymentSessionId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to create order",
        message: error.message || "Unknown error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        raw: error.response?.data || null, // useful if Cashfree returned an API error
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return new Response(JSON.stringify({ error: "order_id is required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `https://api.cashfree.com/pg/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2025-01-01",
        },
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch status" }), {
      status: 500,
    });
  }
}
