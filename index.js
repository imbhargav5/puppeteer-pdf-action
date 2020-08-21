const core = require('@actions/core');
const fs = require('fs').promises;
const os = require("os");
const path = require("path");

function getChromePath() {
    let browserPath;
  
    if (os.type() === "Windows_NT") {
      // Chrome is usually installed as a 32-bit application, on 64-bit systems it will have a different installation path.
      const programFiles =
        os.arch() === "x64"
          ? process.env["PROGRAMFILES(X86)"]
          : process.env.PROGRAMFILES;
      browserPath = path.join(
        programFiles,
        "Google/Chrome/Application/chrome.exe"
      );
    } else if (os.type() === "Linux") {
      browserPath = "/usr/bin/google-chrome";
    } else if (os.type() === "Darwin") {
      browserPath =
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    }
  
    if (browserPath && browserPath.length > 0) {
      return path.normalize(browserPath);
    }
  
    throw new TypeError(`Cannot run action. ${os.type} is not supported.`);
  }
async function run(){
    try{
        const url = core.getInput('url')
        const chromePath  = getChromePath();
        const outputFilePath = core.getInput('output-file-path')
        const createPDF = require('./createPDF');
        const pdf = await createPDF(url, {            
            executablePath: chromePath,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        await fs.writeFile(outputFilePath ,pdf);
    }catch(err){
        console.log(err);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}