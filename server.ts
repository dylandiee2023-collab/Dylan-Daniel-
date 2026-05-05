import express from "express";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("STRIPE_SECRET_KEY environment variable is missing. Stripe endpoints will fail.");
      stripeClient = new Stripe("sk_test_placeholder_key"); // placeholder so it doesn't crash on load
    } else {
      stripeClient = new Stripe(key);
    }
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API - Stripe Integration
  app.post("/api/stripe/create-checkout-session", async (req, res) => {
    try {
      const { priceId } = req.body;
      const stripe = getStripe();
      
      if (!process.env.STRIPE_SECRET_KEY) {
        // Return a mock URL if no real stripe key is set so the demo still "works"
        return res.json({ url: "/billing?session_id=mock_session_success" });
      }

      // We should use APP_URL for success and cancel URIs, defaulting to localhost if not set
      const domainURL = process.env.APP_URL || `http://localhost:${PORT}`;

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${domainURL}/billing?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/billing`,
      });

      res.json({ url: session.url });
    } catch (e: any) {
      console.error(e);
      res.status(400).json({ error: { message: e.message } });
    }
  });

  app.get("/api/stripe/getConfig", (req, res) => {
    res.json({
      publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_placeholder",
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
