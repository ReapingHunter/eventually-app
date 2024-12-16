import express from 'express';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    getEventByFilter, 
    getEventByUser,
    updateEvent, 
    deleteEvent, 
    getTopEvents
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create-event', createEvent); // Create an event
router.get('/all-event', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get a specific event by ID
router.get('/top-events', getTopEvents)
router.get('/event/filter', getEventByFilter);
router.get('/user/:id', getEventByUser);
router.put('/update-event', updateEvent);
router.put('/delete-event/:id', deleteEvent);

export default router;