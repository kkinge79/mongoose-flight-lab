import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()
/* GET users listing. */
router.get('/', flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get("/:id", flightsCtrl.show)


router.post('/', flightsCtrl.create)

router.post('/:id/ticket', flightsCtrl.createTicket)

router.delete('/:id', flightsCtrl.delete)

router.delete('/:id/:ticketid', flightsCtrl.deleteTicket)

export {
  router
}
