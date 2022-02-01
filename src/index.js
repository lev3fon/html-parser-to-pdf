const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const { unZip } = require('./decompress')
const { convertHtml } = require('./htmlToPdf')

const upload = multer({ dest: './uploads/', limits: { fileSize: 2e+9 } })
const app = express()
const port = 3000

app.get('/hi', (req, res) => {
    res.send('Hello, I can convert)')
})

app.post('/pdf', upload.single('toPdf'), async (req, res) => {
    console.log(req.file)
    await unZip(`./uploads/${ req.file.filename }`, `./tmp/${ req.file.filename }`)
    const indexHtml = findIndexHtml(`./tmp/${ req.file.filename }`)
    await convertHtml(indexHtml, `./pdfs/${ req.file.filename }.pdf`)
    // res.send(req.file.filename)
    res.download(`./pdfs/${ req.file.filename }.pdf`)
})

app.get('/download', async (req, res) => {
    res.download('./example/aboba/index.pdf')
})

app.listen(port)

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

