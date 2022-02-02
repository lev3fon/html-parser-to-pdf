const express = require('express')
const multer = require('multer')
const path = require('path')

const { unZip, findIndexHtml, removeFile } = require('./filesHandlers')
const { convertHtml } = require('./htmlToPdf')

const upload = multer({ dest: './uploads/', limits: { fileSize: 2e+9 } })
const app = express()
const port = 3000

app.get('/hi', (req, res) => {
    res.send('Hi, I can convert)')
})

app.post('/pdf', upload.single('toPdf'), async (req, res) => {
    const fileName = req.file.filename
    const pdfName = `${ path.basename(req.file.originalname, '.zip') }-${ fileName }.pdf`

    await unZip(`./uploads/${ fileName }`, `./tmp/${ fileName }`)
    const indexHtml = findIndexHtml(`./tmp/${ fileName }`)
    await convertHtml(indexHtml, `./pdfs/${ pdfName }`)

    await removeFile(`./uploads/${ fileName }`)
    await removeFile(`./tmp/${ fileName }`)

    res.download(`./pdfs/${ pdfName }`)
})

app.listen(port)
