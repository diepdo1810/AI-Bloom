"use server";

import { kv } from "@vercel/kv";
import { nanoid } from "./utils";

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;
  let pattern = form.get("pattern") as string;

  const id = nanoid();

  try {
    const res = await Promise.all([
      kv.hset(id, {
        prompt,
        ...(pattern && { pattern: pattern }),
        image: null,
      }),
    ]);

    console.log(res);
  } catch (error) {
    console.error(error);
  }

  return id;
}
