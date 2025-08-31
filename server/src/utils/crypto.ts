import { createHmac, timingSafeEqual } from "crypto";
import { env } from "../lib/env";

export const sign = (val: string): string => {
  const key = Buffer.from(env.SESSION_SECRET);
  const salt = Buffer.from(val);
  const sig = createHmac("sha256", key).update(salt).digest("base64");
  return `${val}.${sig}`;
};

export const unsign = (signed: string): string | null => {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return null;
  const val = signed.slice(0, idx);
  const expected = sign(val);
  const a = Buffer.from(signed);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? val : null;
};
