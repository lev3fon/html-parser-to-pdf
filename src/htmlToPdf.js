const puppeteer = require('puppeteer')
const path = require("path");
const { log, getMemoryUsage } = require('./logMaker')

const convertHtml = async (htmlFile, pdfOutFile) => {
    log.info({ htmlFile }, 'Начал конвертировать файл')
    const correctUrl = path.resolve(htmlFile)
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await browser.newPage()
    await page.goto(`file:///${ correctUrl }`)
    // await delay(1_000) - костыль, ждём пока не прогрузятся все шрифты и стили, после делаем пдф...
    await page.pdf({ path: pdfOutFile, format: 'a3', printBackground: true })

    await browser.close();
    log.info({ htmlFile, memory: getMemoryUsage() }, 'Закночил конвертировать файл')
}

module.exports = { convertHtml }
