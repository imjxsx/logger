import type { Nullable, Optional } from "../types/index.js";

export function isRecord(arg: unknown): arg is Record<string, unknown> {
  return Object.prototype.toString.call(arg) === "[object Object]";
}
export function isString(arg: unknown): arg is string {
  return typeof arg === "string";
}
export function stringify(...parts: unknown[]): string {
  return parts.map((part) => {
    if (isRecord(part)) {
      return JSON.stringify(part);
    }
    return isString(part) ? part.trim() : String(part).trim();
  }).join(" ");
}
export function JSONparse<T>(text: string, reviver?: Optional<(this: unknown, key: string, value: unknown) => unknown>): Nullable<T> {
  try {
    return JSON.parse(text, reviver);
  }
  catch {
    return null;
  }
}