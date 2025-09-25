import colors from "colors";
import os from "node:os";
import type { LoggerLevel, LoggerOptions, Nullable } from "./types/index.js";
import { stringify } from "./utils/index.js";

/**
 * A lightweight and customizable Logger for Node.js applications.
 */
class Logger {
  public name: string;
  public timestamp: () => string;
  public level: LoggerLevel;
  public colorize: boolean;
  public json: boolean;
  private hierarchy: Record<LoggerLevel, number> = {
    OFF: -1,
    FATAL: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5,
  };
  constructor(options?: Nullable<LoggerOptions>) {
    this.name = options?.name || `${process.pid}`;
    this.timestamp = options?.timestamp || (() => new Date().toJSON());
    this.level = options?.level || "INFO";
    this.colorize = options?.colorize ?? true;
    this.json = options?.json ?? false;
  }
  private format(color: string, level: LoggerLevel, message: string): string {
    const timestamp = this.timestamp();
    if (this.json) {
      return JSON.stringify({
        timestamp,
        level,
        name: this.name,
        message,
        pid: process.pid,
        hostname: os.hostname(),
      });
    }
    else if (this.colorize) {
      return stringify([colors.fg.white, "[", color, timestamp, colors.fg.white, "] [", color, this.name, colors.fg.white, "] [", color, level, colors.fg.white, "] ", color, message, colors.reset, "\n"]);
    }
    else {
      return stringify(["[", timestamp, "] [", this.name, "] [", level, "] ", message, "\n"]);
    }
  }
  public fatal(...parts: any[]): void {
    if (this.hierarchy[this.level] >= this.hierarchy["FATAL"]) {
      console.error(this.format(colors.fg.bright.red, "FATAL", stringify(parts, " ")));
    }
  }
  public error(...parts: any[]): void {
    if (this.hierarchy[this.level] >= this.hierarchy["ERROR"]) {
      console.error(this.format(colors.fg.red, "ERROR", stringify(parts, " ")));
    }
  }
  public warn(...parts: any[]): void {
    if (this.hierarchy[this.level] >= this.hierarchy["WARN"]) {
      console.warn(this.format(colors.fg.yellow, "WARN", stringify(parts, " ")));
    }
  }
  public info(...parts: any[]): void {
    if (this.hierarchy[this.level] >= this.hierarchy["INFO"]) {
      console.info(this.format(colors.fg.cyan, "INFO", stringify(parts, " ")));
    }
  }
  public debug(...parts: any[]): void {
    if (this.hierarchy[this.level] >= this.hierarchy["DEBUG"]) {
      console.debug(this.format(colors.fg.blue, "DEBUG", stringify(parts, " ")));
    }
  }
  public trace(...parts: any[]): void {
    if (this.hierarchy[this.level] >= this.hierarchy["TRACE"]) {
      console.warn(this.format(colors.fg.gray, "TRACE", stringify(parts, " ")));
    }
  }
  public child(options?: Nullable<LoggerOptions>): Logger {
    return new Logger({
      name: this.name,
      timestamp: this.timestamp,
      level: this.level,
      colorize: this.colorize,
      json: this.json,
      ...options,
    });
  }
}
export default Logger;
export {
  Logger,
};