import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../lib/middlewares";

export const tabsRoute = new Hono<AppContext>()
  .post(
    "/",
    authMiddleware,
    zValidator(
      "json",
      z.object({
        tabs: z.array(
          z.object({
            url: z.string().url(),
          })
        ),
        deviceName: z.string().nonempty(),
      })
    ),
    async (ctx) => {
      const { tabs, deviceName } = ctx.req.valid("json");

      const tabsData = ctx.get("tabs");
      let newTabs = tabsData;

      for (const tab of tabsData) {
        if (
          !tabs.find((t) => t.url === tab.url) &&
          tab.deviceName === deviceName
        )
          newTabs = newTabs.filter((t) => t.url !== tab.url);
      }

      for (const tab of tabs) {
        if (!tabsData.find((t) => t.url === tab.url))
          newTabs.push({ ...tab, deviceName, timestamp: Date.now() });
      }

      await ctx.env.CROSSTAB_KV.put(
        `tabs:${ctx.get("token")}`,
        JSON.stringify(newTabs)
      );

      return ctx.json({
        message: "Tabs saved successfully",
      });
    }
  )
  .get("/", authMiddleware, async (ctx) => {
    const tabsData = ctx.get("tabs");

    return ctx.json({
      tabs: tabsData,
    });
  })
  .delete("/", authMiddleware, async (ctx) => {
    const token = ctx.get("token");

    await ctx.env.CROSSTAB_KV.put(`tabs:${token}`, JSON.stringify([]));

    return ctx.json({
      message: "Tabs deleted successfully",
    });
  });
