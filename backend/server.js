import { app } from "./src/app.js";
import { env } from "./src/config/env.js";
import { checkDbConnection } from "./src/config/db.js";

async function startServer() {
  try {
    await checkDbConnection();

    app.listen(env.PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`,
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
