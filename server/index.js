const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const userData = require("./data/userData.json");

app.get("/search", (req, res) => {
  const query = req.query.query;
  // Get the query params from the get call
  if (query) {
    // Run search only if the query is present
    var filteredUsers = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.address.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toLowerCase().includes(query.toLowerCase()) ||
        user.pincode.toLowerCase().includes(query.toLowerCase()) ||
        user.items.includes(query)
    );
    // Creating a new variable filteredUsers if it includes the characters present in the query stirng
    res.send(filteredUsers);
    // Send the filteredUsers in JSON format
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
