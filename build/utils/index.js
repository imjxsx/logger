export function isRecord(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
export function stringify(parts, separator = "") {
    return parts.map((part) => {
        if (isRecord(part)) {
            return JSON.stringify(part);
        }
        else {
            return String(part);
        }
    }).join(separator);
}
