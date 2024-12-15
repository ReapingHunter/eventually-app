import express from 'express';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    getEventByFilter, 
    updateEvent, 
    deleteEvent 
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create-event', createEvent); // Create an event
router.get('/all-event', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get a specific event by ID
router.get('/filter-event', getEventByFilter);
router.put('/update-event', updateEvent);
router.delete('/delete-event', deleteEvent);

export default router;