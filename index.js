const express = require('express')
const setupDB = require('./config/database')
const {usersRouter} = require('./app/controllers/UsersController')
const router = require('./config/routes')

const app = express()
setupDB()

const port = 3022

app.use(express.json())
app.use('/users', usersRouter)
app.use('/', router)

app.listen(port, function(){
    console.log('Listening to port', port)
})