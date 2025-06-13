import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid authorization header" }, 401);
  }

  const token = authorization.substring(7);
  const tabsKey = `tabs:${token}`;
  const tabsData = await c.env.CROSSTAB_KV.get(tabsKey);

  if (!tabsData) {
    return c.json({ error: "Invalid token" }, 401);
  }

  c.set("token", token);
  c.set("tabs", JSON.parse(tabsData) as Tab[]);
  await next();
};
