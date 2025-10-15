import colors from "@imjxsx/colors";
import os from "node:os";
import type { LoggerLevel, LoggerOptions, LoggerSend, Nullable, Optional } from "./types/index.js";
import { JSONparse, stringify } from "./utils/index.js";

/**
 * `ES`
 * Un registrador liviano y personalizable para aplicaciones Node.js
 * 
 * `EN`
 * A lightweight and customizable logger for Node.js applications
 * 
 * @example
 * ```javascript
 * // index.js
 * import axios from "axios";
 * import Logger from "@imjxsx/logger"; // or import { Logger } from "@imjxsx/logger";
 * 
 * let logger = new Logger({
 *   name: "COLORIZED LOGGER",
 *   colorize: true,
 * });
 * logger.error("An unexpected error occurred");
 * 
 * logger = new Logger({
 *   name: "JSON LOGGER",
 *   json: true,
 * });
 * logger.info({
 *   iq: "new:user",
 *   data: [
 *     {
 *       name: "I'm Jxsx",
 *       email: "imjxsx@github.com",
 *       password: "*************",
 *       age: "17",
 *       country: "PY",
 *     },
 *   ],
 * });
 * 
 * logger = new Logger({
 *   name: "COLORLESS LOGGER",
 *   colorize: false,
 * });
 * logger.error("An unexpected error occurred");
 * 
 * logger = new Logger({
 *   name: "HOOK LOGGER",
 *   async send(log) {
 *     if (log.level === "ERROR") {
 *       await axios.post("https://your.domain.com/api/report/error", log);
 *     }
 *   },
 * });
 * logger.error("Error: This is an error");
 * ```
 */
class Logger {
  public name: string;
  public timestamp: () => string;
  private hostname = os.hostname();
  public level: LoggerLevel;
  public colorize: boolean;
  public json: boolean;
  public send: Nullable<(log: LoggerSend) => Promise<void>>;
  private hierarchy: Record<LoggerLevel, number> = {
    OFF: -1,
    FATAL: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5,
  };
  constructor(options?: Optional<LoggerOptions>) {
    this.name = options?.name || `LOGGER ${process.pid}`;
    this.timestamp = options?.timestamp || (() => new Date().toJSON());
    this.level = options?.level || "INFO";
    this.colorize = options?.colorize ?? true;
    this.json = options?.json ?? false;
    this.send = options?.send;
  }
  private write(level: LoggerLevel, color: string, parts: unknown[], target: "stderr" | "stdout"): void {
    if (this.hierarchy[this.level] < this.hierarchy[level]) {
      return;
    }
    const message = stringify(...parts);
    const timestamp = this.timestamp();
    if (this.send) {
      const payload: LoggerSend = {
        level,
        name: this.name,
        message,
        timestamp,
        pid: process.pid,
        hostname: this.hostname,
      };
      this.send(payload).catch((e) => {
        process.stderr.write(this.format(colors.fg.red, "ERROR", stringify(e), this.timestamp()));
      });
    }
    const output = this.format(color, level, message, timestamp);
    process[target].write(output);
    process[target].write("\n");
  }
  private format(color: string, level: LoggerLevel, message: string, timestamp: string): string {
    if (this.json) {
      return JSON.stringify({
        timestamp,
        level,
        name: this.name,
        message: JSONparse(message) ?? message,
        pid: process.pid,
        hostname: this.hostname,
      });
    }
    else if (this.colorize) {
      return `${colors.fg.white}[${color}${timestamp}${colors.fg.white}] [${color}${this.name}${colors.fg.white}] [${color}${level}${colors.fg.white}] ${color}${message}${colors.reset}`;
    }
    else {
      return `[${timestamp}] [${this.name}] [${level}] ${message}`;
    }
  }
  public fatal(...parts: unknown[]): void {
    this.write("FATAL", colors.fg.bright.red, parts, "stderr");
  }
  public error(...parts: unknown[]): void {
    this.write("ERROR", colors.fg.red, parts, "stderr");
  }
  public warn(...parts: unknown[]): void {
    this.write("WARN", colors.fg.yellow, parts, "stderr");
  }
  public info(...parts: unknown[]): void {
    this.write("INFO", colors.fg.cyan, parts, "stdout");
  }
  public debug(...parts: unknown[]): void {
    this.write("DEBUG", colors.fg.blue, parts, "stdout");
  }
  public trace(...parts: unknown[]): void {
    this.write("TRACE", colors.fg.gray, parts, "stdout");
  }
  public child(options?: Optional<LoggerOptions>): Logger {
    return new Logger({
      name: this.name,
      timestamp: this.timestamp,
      level: this.level,
      colorize: this.colorize,
      json: this.json,
      send: this.send ?? undefined,
      ...options,
    });
  }
}
export default Logger;
export { Logger };
