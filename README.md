# 📝 @imjxsx/logger (v1.0.2)

## A lightweight and customizable Logger for Node.js applications

### 📥 Installation

---

#### - With NPM

```bash
npm install @imjxsx/logger
```

#### - With PNPM

```bash
pnpm add @imjxsx/logger
```

#### - With YARN

```bash
yarn add @imjxsx/logger
```

---

### 🚀 Example of Use

```javascript
// index.js
import Logger from "logger";

const logger = new Logger({
  name: "App",
  level: "INFO",
  colorize: true,
});
logger.fatal("Fatal error!"); // [2025-09-25T20:21:00.197Z] [App] [FATAL] Fatal error!
logger.info("Server listening on port \"5000\"."); // [2025-09-25T20:21:00.197Z] [App] [INFO] Server listening on port "5000".
```

---

Developed with **❤** by **[imjxsx](https://github.com/imjxsx)**
