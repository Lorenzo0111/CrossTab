import { Hono } from "hono";
import { cors } from "hono/cors";
import { devicesRoute } from "./routes/devices";
import { tabsRoute } from "./routes/tabs";

const app = new Hono<AppContext>()
  .use(
    "*",
    cors({
      origin: "*",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  )
  .get("/", (c) => {
    return c.json({
      message: "CrossTab API is running",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  })
  .route("/devices", devicesRoute)
  .route("/tabs", tabsRoute);

export default app;
