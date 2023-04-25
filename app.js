const express = require('express')
const app = express()
const port = 3000

const Papa = require('papaparse');
const fs = require('fs');

// Include the express body parser
app.use(express.json());

// Include CORS to allow cross origin requests
const cors = require('cors');
app.use(cors());

// const colors = require('./colors.json')

const colors = { "FMC": [0, 255, 0], "PMC": [255, 255, 0], "NMC": [255, 0, 0] }
const dataFile = './mockMxData.csv';
const mockStatuses = require('./mockStatuses.json');

let mxData = [];

function getMxRecords(id) {
  const mxDataCSV = fs.readFileSync(dataFile, 'utf8');
  // Convert dataFile csv to JSON
  mxData = Papa.parse(mxDataCSV, { header: true });
}

getMxRecords();

app.post('/visualizer/colors', (req, res) => {

  // Build the response based on an array of component strings
  const response = [];

  // Compile a response object that looks like
  //   [
  //   {
  //     "color": [0, 255, 255],
  //     "components": ["Example Part Id #1", "Example Part Id #2"]
  //   },
  //   {
  //     "color": [255, 0, 255],
  //     "components": ["Example Part Id The Implementation Does Not Know About"]
  //   }
  // ]

  const requestedComponents = req.body.components;

  // Loop through the colors object
  for (const color in colors) {
    // Create a new object for each color
    const newColor = {
      color: colors[color],
      components: []
    }

    // Loop through the mockStatuses object
    for (const status in mockStatuses) {
      // If the status matches the color
      if (mockStatuses[status] === color) {
        // If the component is listed in the request body then add it to the components array
        if (requestedComponents.includes(status)) {
          newColor.components.push(status);
        }
      }
    }

    if (newColor.components.length === 0) {
      // If there are no components, don't add the color to the response
      continue;
    }

    // Add the new color to the response array
    response.push(newColor);
  }

  // Send the response
  res.json(response)
})

app.get('/mxrecords/', (req, res) => {
  // Get the id from the request
  const equipid = req.query.equipid;

  // Filter the mxData array to only include the records with the matching equipid
  let records = mxData.data.filter(record => record["EVT EQUIP-ID"] === equipid);

  // Filter to only include the fields we want
  const fields = ["EVENT-ID", "WCE", "DDR", "WCE NARRATIVE", "CORRECTIVE ACTION"];
  records = records.map(record => {
    const newRecord = {};
    fields.forEach(field => {
      newRecord[field] = record[field];
    })
    return newRecord;
  })

  // Send the response
  res.json(records);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})