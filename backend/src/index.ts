import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import { startEmailWorker } from "./services/index.js";

const startServer = async () => {
  try {
    await connectDB();
    startEmailWorker();
    app.listen(env.PORT, () => {
      console.log(`Backend running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();
