import { Flight} from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new')
}

function create(req, res) {
  const flight = new Flight(req.body)
Flight.create(req.body, function(error, flight) {
  res.redirect('/flights')
})
}

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      allFlights: flights
    })
  })
}

export {
  newFlight as new,
  create,
  index
}