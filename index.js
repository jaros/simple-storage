const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(cors())
app.set('view engine', 'pug')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const PORT = '5000' || process.env.PORT
app.post('/upload', upload.array('photos', 12), (req, res) => {
    res.json({ file: req.files })
})

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello there!' })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))