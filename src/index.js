import { app } from "./app.js";
import { connectDb } from "./config/db.config.js";
const PORT = process.env.PORT;

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () =>
      console.log(
        `Server is running on Port - ${PORT} - http://localhost:${PORT}`
      )
    );
  } catch (error) {
    console.error("An error occurred while running server", error);
  }
})();
