# 📝 @imjxsx/logger (v1.1.0)

## A lightweight and customizable logger for Node.js applications

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
import axios from "axios";
import Logger from "@imjxsx/logger"; // or import { Logger } from "@imjxsx/logger";

let logger = new Logger({
  name: "COLORIZED LOGGER",
  colorize: true,
});
logger.error("An unexpected error occurred");

logger = new Logger({
  name: "JSON LOGGER",
  json: true,
});
logger.info({
  iq: "new:user",
  data: [
    {
      name: "I'm Jxsx",
      email: "imjxsx@github.com",
      password: "*************",
      age: "17",
      country: "PY",
    },
  ],
});

logger = new Logger({
  name: "COLORLESS LOGGER",
  colorize: false,
});
logger.error("An unexpected error occurred");

logger = new Logger({
  name: "HOOK LOGGER",
  async send(log) {
    if (log.level === "ERROR") {
      await axios.post("https://your.domain.com/api/report/error", log);
    }
  },
});
logger.error("Error: This is an error");
```

---

Developed with **❤** by **[imjxsx](https://github.com/imjxsx)**
