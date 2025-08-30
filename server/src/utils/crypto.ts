import { createHmac } from "crypto";
import { env } from "../lib/env";

export const sign = (val: string): string => {
  const key = Buffer.from(env.SESSION_SECRET);
  const salt = Buffer.from(val);
  const sig = createHmac("sha256", key).update(salt).digest("base64");
  return `${val}.${sig}`;
};
