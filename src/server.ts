import { connect } from "mongoose";

import app from "./app.js";

const { PORT, MONGODB_URI } = process.env;

(async () => {
  try {
    await connect(MONGODB_URI as string);
    app.listen(PORT as string, () =>
      console.log(
        `MongoDB connected and Server running on http://localhost:${PORT}`
      )
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
