const main = require("./createPDF");
const fs = require("fs").promises

async function run(){
    const pdf = await main("https://imbhargav5.com");
    await fs.writeFile('output.pdf',pdf);
    return pdf  
}

/* istanbul ignore next */
if (require.main === module) {
    run();
}