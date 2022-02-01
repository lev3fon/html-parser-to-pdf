const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 3000

app.get('/hi', (req, res) => {
    res.send('Hello, I can convert)')
})

app.post('/pdf', upload.single('kek'), async (req, res) => {
    console.log(req.file)
    res.send(req.file.filename)
})

app.listen(port)