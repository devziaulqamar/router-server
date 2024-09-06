const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors"); // Import the cors library

app.use(cors());

// Define a simple GET API
app.get("/api/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/login", (req, res) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // Call the external API using fetch
  fetch(
    "http://192.168.0.1/adminLogin?callback=jQuery1113004036848156300099_1725247431126&loginparam=%7B%22username%22%3A%22admin%22%2C%22password%22%3A%22admin%22%7D&_=1725247431128",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result); // Log the result
      res.send(result); // Send the result back to the client
    })
    .catch((error) => {
      console.error("Error:", error); // Log any error
      res.status(500).send("Error fetching data"); // Send an error response to the client
    });
});


// Define the /api/dashboard endpoint
app.get('/api/dashboard', (req, res) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  
    // Fetch call to the dashboard endpoint
    fetch('http://192.168.0.1/jsonp_dashboard?callback=jQuery1113007059783700931699_1725598971804&_=1725598971808', requestOptions)
      .then((response) => response.text())
      .then((dashboardResult) => {
        console.log('Dashboard Result:', dashboardResult); // Log the dashboard result
        res.send(dashboardResult); // Send the result back to the client
      })
      .catch((error) => {
        console.error('Error:', error); // Log any error
        res.status(500).send('Error fetching dashboard data'); // Send an error response to the client
      });
  });
  
  


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
