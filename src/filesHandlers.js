const filesHandlers = require('decompress')
const path = require("path")
const fs = require("fs")
const { log, getMemoryUsage } = require('./logMaker')

const unZip = async (zipPath, distPath) => {
    log.info({ zipPath, distPath }, 'Начинаю разархивировать')
    try {
        await filesHandlers(zipPath, distPath)
        log.info({ zipPath, distPath }, 'Закончил разархивировать')
    } catch (error) {
        log.error({ zipPath, distPath }, `Ошибка: ${ error }`)
    }
}

const findIndexHtml = (dirPath) => {
    log.info({ dirPath }, 'Начинаю искать index.html')
    const allFiles = getAllFiles(dirPath)

    for (const file of allFiles) {
        if (path.basename(file) === 'index.html') {
            log.info({ dirPath, indexHtmlFile: file, memory: getMemoryUsage() }, 'Закончил искать index.html')
            return file
        }
    }
    log.info({ dirPath, memory: getMemoryUsage() }, 'Не нашел index.html')
}

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

const removeFile = (path) => {
    log.info({ path }, 'Удаляю папку или файл')
    try {
        fs.rmSync(path, { recursive: true, force: true });
        log.info({ path, memory: getMemoryUsage() }, 'Удалил папку или файл')
    } catch (error) {
        log.error({ path, memory: getMemoryUsage() }, `Ошибка: ${ error }`)
    }
}

module.exports = { unZip, findIndexHtml, removeFile }
