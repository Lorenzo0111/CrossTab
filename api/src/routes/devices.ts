import { Hono } from "hono";
import { authMiddleware } from "../lib/middlewares";
import { generateToken } from "../lib/utils";

export const devicesRoute = new Hono<AppContext>()
  .post("/create", async (ctx) => {
    const token = generateToken();

    await ctx.env.CROSSTAB_KV.put(`tabs:${token}`, JSON.stringify([]));

    return ctx.json({
      token,
      message: "Device created successfully",
    });
  })
  .delete("/", authMiddleware, async (ctx) => {
    const token = ctx.get("token");

    await ctx.env.CROSSTAB_KV.delete(`tabs:${token}`);

    return ctx.json({
      message: "Device deleted successfully",
    });
  });
