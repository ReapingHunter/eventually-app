import express from 'express';
import { createEvent, getAllEvents, getEventById, getEventByFilter, getEventByUser, updateEvent } from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create-event', createEvent); // Create an event
router.get('/all-event', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get a specific event by ID
router.get('/filter-event', getEventByFilter);
router.get('/user-event', getEventByUser);
router.get('/update-event', updateEvent);

export default router;