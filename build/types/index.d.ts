export type Nullable<T> = T | undefined | null;
export type LoggerLevel = "OFF" | "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE";
export interface LoggerOptions {
    name?: Nullable<string>;
    timestamp?: Nullable<() => string>;
    level?: Nullable<LoggerLevel>;
    colorize?: Nullable<boolean>;
    json?: Nullable<boolean>;
}
