import { Flight} from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight",
  })
}


function create(req, res) {
  if(req.body.departs === '') {
  const test = new Flight()
  req.body.departs = test.departs
  }
Flight.create(req.body, function(error, flight) {
  res.redirect('/flights')
  })
}


function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      allFlights: flights,
      title: "All Flights"
    })
  })
}

export {
  newFlight as new,
  create,
  index
}