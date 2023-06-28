// Import dependencies
const express = require("express");

// Create app instance
const app = express();

// Define JSON as return type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get", async (req, res) => {
  console.log("wuheee");
  res.status(200).json({ message: "wuhee" });
  res.status(201).json({ message: "wuhee" });
});

app.post("/tasks", async (req, res) => {
  console.log("wuheee");
  res.status(200).json({ message: "wuhee" });
  res.status(201).json({ message: "wuhee" });
  const { description, enddate } = req.body;

  if (!description || !enddate) {
    res.status(400).json({ message: "description and enddate are required" });
    return;
  }

  try {
    res.status(201).json({ description, enddate });
    /*const response = await fetch("localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => res.json());*/
  } catch (error) {
    res.status(400).json({ error: true, message: error.message, data: null });
  }

  /*app.get("/tasks", async (req, res) => {
    try {
      
    } catch (error) {
      res.status(400).json({ error: true, message: error.message, data: null });
    }
  });*/
});

module.exports = app;
