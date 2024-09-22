const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null, show:null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=f33a484cf794d08d0148764789aaba32`;
  let weather;
  let error = null;
  let show = false
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
    show=true
  } catch (error) {
    weather = null;
    show=true
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  console.log("test>>>>>>>>>>", weather, error, show)
  res.render("index", { weather, error, show });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
