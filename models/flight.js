import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String,
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: "DEN"},
  flightNo: Number,
  departs: {type: Date, default: function() {
    const date = new Date()
    const addOne = date.getFullYear()+1
    date.setFullYear(addOne)
    return date
  }},
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}