const mongoose = require('mongoose')

const URL = 'mongodb://0.0.0.0:27017/pos'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', () => {
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error', () => {
    console.log('Mongo DB Connection Failed')
})