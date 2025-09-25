export function isRecord(value: any): value is Record<string, any> {
  return Object.prototype.toString.call(value) === "[object Object]";
}
export function stringify(parts: any[], separator: string = "") {
  return parts.map((part) => {
    if (isRecord(part)) {
      return JSON.stringify(part);
    } else {
      return String(part);
    }
  }).join(separator);
}