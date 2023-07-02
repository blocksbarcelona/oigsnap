// load Puppeteer
const { exit } = require("process");
const pt = require("puppeteer");

// get current date/time
let date_time = new Date();

// get current date
// adjust 0 before single digit date
let day = ("0" + date_time.getDate()).slice(-2);

// get current month
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

// get current year
let year = date_time.getFullYear();

// get current hours
let hours = date_time.getHours();

// get current minutes
let minutes = date_time.getMinutes();

// get current seconds
let seconds = date_time.getSeconds();

// prints date in YYYY-MM-DD format
const sc_date = (year + "-" + month + "-" + day + "-" + hours + "-" + minutes + "-" + seconds);
 
// this script accepts a url as an argument
let url = new URL(process.argv[2]);
// the filename will be extracted from the hostname of the url
let filename = `${url.hostname}-${sc_date}.png`;
 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let scw = Number(process.argv[3]);
let sch = Number(process.argv[4]);

if (scw < 1900 || scw > 3000) scw = 1900;
if (sch < 1000 || sch > 6000) sch = 1000;


// launch Puppeteer and add image parameters
pt.launch().then(async (browser) => {
  const p = await browser.newPage();
 
  // capture an image that is 1000 x 500 pixels
  await p.setViewport({ width: scw, height: sch });
 
  // navigate to the site you would like to capture
  await p.goto(url, { waitUntil: "domcontentloaded" });
 
  delay(5000).then(async () => {
    // take the screenshot of the site and save it to the current folder
    await p.screenshot({ path: filename });
 
    // close the Puppeteer browser when you are finished.
    await browser.close();
 
    console.log("done");
  });
});