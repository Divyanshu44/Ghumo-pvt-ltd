const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load data from JSON file
let data = JSON.parse(fs.readFileSync("places.json", "utf8"));

// Get all places
app.get("/places", (req, res) => {
  res.json(data);
});

// Add a new place
app.post("/places", (req, res) => {
  const newPlace = req.body;
  data.push(newPlace);

  // Save updated data to file
  fs.writeFileSync("places.json", JSON.stringify(data, null, 2));
  res.json(newPlace);
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
