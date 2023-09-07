const fs = require("fs");
const https = require("https");
const cron = require("node-cron");

const apiUrl =
  "https://api.metals.dev/v1/latest?api_key=UH3CAC7EOTVTZMAGMDUS152AGMDUS&currency=USD&unit=toz";
const jsonFilePath = "data.json"; // Specify the path to your JSON file

function fetchDataAndSave() {
  https.get(apiUrl, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Save JSON data to a file
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log("Data saved to JSON file successfully.");
        }
      });
    });
  });
}

// Schedule the function to run every 10 minutes (cron syntax: '*/10 * * * *')
cron.schedule("*/5 * * * *", () => {
  console.log("Running fetchDataAndSave function...");
  fetchDataAndSave();
});
