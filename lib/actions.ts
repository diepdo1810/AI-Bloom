"use server";

import { nanoid } from "./utils";

export async function generate() {
  const id = nanoid();

  return id;
}
