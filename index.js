// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs"); // Import file system module for logging

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For JSON body parsing

const port = process.env.PORT || 3001;

// Function to log messages to a file
const logToFile = (message) => {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("request_logs.txt", logMessage, (err) => {
    if (err) {
      console.error("Error logging to file", err);
    }
  });
};

// GET endpoint to fetch product data
app.get("/api/product", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    res.json(response.data);
    logToFile(`Success: Fetched products from dummyjson API.`);
  } catch (error) {
    logToFile(`Error: Failed to fetch products - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Default route
app.get("/", (req, res) => {
  const message = "Hello World!";
  res.send(message);
  logToFile(message);
});

// POST endpoint to create a product
app.post("/api/createProduct", async (req, res) => {
  try {
    const { productName, price } = req.body;

    // Check if productName and price are present in the request body
    if (!productName || !price) {
      throw new Error("productName and price are required");
    }

    console.log(`Creating product: ${productName} with price: ${price}`);

    // Log the product creation action
    logToFile(`Success: Created product '${productName}' with price ${price}.`);

    // Send a success response
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    logToFile(`Error: Failed to create product - ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// NEW POST endpoint that logs every call
app.post("/api/logEvent", (req, res) => {
  try {
    const { event, description } = req.body;

    if (!event || !description) {
      throw new Error("Event and description are required.");
    }

    // Log the event
    logToFile(`Event: ${event}, Description: ${description}`);

    // Send a success response
    res.status(201).json({ message: "Event logged successfully" });
  } catch (error) {
    logToFile(`Error: Failed to log event - ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
