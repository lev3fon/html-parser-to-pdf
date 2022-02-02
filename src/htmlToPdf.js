const puppeteer = require('puppeteer')
const path = require("path");
const { log, getMemoryUsage } = require('./logMaker')

const convertHtml = async (htmlFile, pdfOutFile) => {
    log.info({ htmlFile }, 'Начал конвертировать фалй')
    const correctUrl = path.resolve(htmlFile)

    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto(`file:///${ correctUrl }`)
    await page.pdf({ path: pdfOutFile, format: 'a3', printBackground: true })

    await browser.close();
    log.info({ htmlFile, memory: getMemoryUsage() }, 'Закночил конвертировать фалй')
}

module.exports = { convertHtml }
