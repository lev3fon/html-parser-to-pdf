const puppeteer = require('puppeteer')
const path = require("path");

const convertHtml = async (htmlFile, pdfOutFile) => {
    const correctUrl = path.resolve(htmlFile)

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(correctUrl);
    // await page.emulateMediaType('screen') - подумай ещё раз... что это и для чего
    await page.pdf({ path: pdfOutFile, format: 'a3', printBackground: true });

    await browser.close();
}

module.exports = { convertHtml }

// convertHtml('./example/aboba/index.html', './example/aboba/index.pdf') - пример запуска