export type Nullable<T> = T | undefined | null;
export type Optional<T> = T | undefined;
export type LoggerLevel = "OFF" | "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE";
export interface LoggerSend {
  level: string;
  name: string;
  message: string;
  timestamp: string;
  pid: number;
  hostname: string;
}
export interface LoggerOptions {
  name?: Optional<string>;
  timestamp?: Optional<() => string>;
  level?: Optional<LoggerLevel>;
  colorize?: Optional<boolean>;
  json?: Optional<boolean>;
  send?: Optional<(log: LoggerSend) => Promise<void>>;
}