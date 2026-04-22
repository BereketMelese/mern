import app from "./app.js";
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
// API entry point
export const API_NAME = "@mern/api";
