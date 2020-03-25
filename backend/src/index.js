const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)


const porta = 3333
app.listen(porta, () => {
    console.log(`Back-end em http://localhost:${porta}`)
})