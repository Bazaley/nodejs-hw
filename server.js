import { app, PORT } from "./app.js";

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
