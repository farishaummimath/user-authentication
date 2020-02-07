const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const setupDB = ()=>mongoose.connect('mongodb://localhost:27017/blog-video',{useNewUrlParser:true, useUnifiedTopology: true })
    .then(function(){
        console.log('Connected to DB')
    })
    .catch(function(){
        console.log('Error connecting to db')
    })
mongoose.set('useCreateIndex', true)
module.exports = setupDB