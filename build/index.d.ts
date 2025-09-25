import type { LoggerLevel, LoggerOptions, Nullable } from "./types/index.js";
/**
 * A lightweight and customizable Logger for Node.js applications.
 */
declare class Logger {
    name: string;
    timestamp: () => string;
    level: LoggerLevel;
    colorize: boolean;
    json: boolean;
    private hierarchy;
    constructor(options?: Nullable<LoggerOptions>);
    private format;
    fatal(...parts: any[]): void;
    error(...parts: any[]): void;
    warn(...parts: any[]): void;
    info(...parts: any[]): void;
    debug(...parts: any[]): void;
    trace(...parts: any[]): void;
    child(options?: Nullable<LoggerOptions>): Logger;
}
export default Logger;
export { Logger, };
