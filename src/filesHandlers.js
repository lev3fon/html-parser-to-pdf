const filesHandlers = require('decompress');
const path = require("path");
const fs = require("fs");

const unZip = async (zipPath, distPath) => {
    try {
        await filesHandlers(zipPath, distPath)
    } catch (error) {
        console.log(error)
    }
}

const findIndexHtml = (dirPath) => {
    const allFiles = getAllFiles(dirPath)

    for (const file of allFiles) {
        if (path.basename(file) === 'index.html')
            return file
    }
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
    try {
        fs.rmSync(path, { recursive: true, force: true });
        console.log("File removed:", path);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { unZip, findIndexHtml, removeFile }