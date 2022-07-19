let mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
        car: String,
        model: String,
        year: Number
  })

  module.exports = mongoose.model('carSchema', carSchema)