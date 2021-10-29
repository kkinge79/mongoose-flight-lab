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

export {
  newFlight as new,
  create
}