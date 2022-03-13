const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const userData = require("./data/userData.json");

app.get("/", (req, res) => {
  const query = req.query.query;
  res.send(userData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
