const puppeteer = require("puppeteer");
const commandLineArgs = require("command-line-args");
const request = require("request");

const { optionDefinitions, getLogger, printHelp, sleep, setColorTheme } = require("./utilities");

/** parse command line argumets*/
const options = commandLineArgs(optionDefinitions);

setColorTheme();

/** regex to find all media files with extension mp3|mp4|ogg|webm|wav */
const regex = /(https|http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(mp3|mp4|ogg|webm|wav)([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

/** get logger or NOOP function based of verbose argument */
const logger = getLogger(options.verbose);

/**
 * Function:urlExists  is used to check id a url is valid and has media content type.
 * it uses HEAD method to parse headers
 * this function will always resolve either true or flase.
 * TRUE: is url is valid and has audio/video content type
 * FALSE: in all ther cases including request fail
 *
 * Parms: http url string
 * Return: Promise
 * */
function urlExists(url) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: url,
        method: "HEAD",
        followOriginalHttpMethod: true,
        followAllRedirects: true,
      },
      function(err, res) {
        if (err) return resolve(false);
        try {
          let json = res.toJSON();
          let headers = json.headers;
          logger(`url : ${url}`.debug);
          logger(`statusCode : ${json.statusCode}`.debug);
          logger(`headers :  ${JSON.stringify(json.headers)}`.debug);

          /** check is request was successful and has content type as audio or video */
          if (
            json.statusCode == 200 &&
            (headers["content-type"].startsWith("audio") >= 0 || headers["content-type"].startsWith("video") >= 0)
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (e) {
          resolve(false);
        }
      },
    );
  });
}

async function getMediaUrls(pageUrl) {
  /** initialize chromeHeadless */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /** wait until all the request complete */
  await page.goto(pageUrl, { waitUntil: "networkidle0" }).catch(e => {
    console.log(`error occurred , while loading the page, please check network and given url`.error);
    process.exit(0);
  });

  /** wait to allow any post rendering */
  await sleep(2000);

  /** get page content */
  const content = await page.content();

  /** find all valid media urls */
  const urls = content.match(regex);

  urls.forEach(async url => {
    /** check if url is valid */
    let result = await urlExists(url);

    if (result) {
      logger(`valid url, printing it`.debug);
      console.log(`${url}`.info);
    } else {
      logger("invalid media url".error);
    }

    logger("-----------------------------------".data);
  });
  /** close the browser */
  browser.close();
}

/** check if url is passed as argument otherwise print help */
if (!options.url) {
  printHelp();
  process.exit(0);
}
/** find all valid media urls for given url */
getMediaUrls(options.url);
