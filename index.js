const fs = require('fs');
const pt = require('puppeteer');

// Function to create a directory if it doesn't exist
const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// Function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get current date
const currentDate = new Date();
const year = currentDate.getFullYear().toString();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

// Construct folder name with current date
const folderName = `${year}-${month}-${day}`;
const screenshotsDir = `./snapshots/${folderName}`;

// Create the directory if it doesn't exist
createDirectoryIfNotExists(screenshotsDir);

// Get other date/time components for the file name
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

// Construct file name with the date and time
const sc_date = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

// Accept URL as an argument
let url = new URL(process.argv[2]);

// The filename will be extracted from the hostname of the url
let filename = `${screenshotsDir}/${url.hostname}-${sc_date}.png`;

// Read screenshot dimensions from arguments, with default values
let scw = parseInt(process.argv[3], 10) || 1900;
let sch = parseInt(process.argv[4], 10) || 1000;

// Validate dimensions
scw = scw >= 1900 && scw <= 3000 ? scw : 1900;
sch = sch >= 1000 && sch <= 6000 ? sch : 1000;

// Launch Puppeteer and add image parameters
(async () => {
  const browser = await pt.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: scw, height: sch });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await delay(5000); // wait for 5 seconds

  await page.screenshot({ path: filename });
  await browser.close();

  console.log(`Screenshot saved: ${filename}`);
})();
