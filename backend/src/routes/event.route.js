import express from 'express';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    getEventByFilter, 
    getEventByUser,
    updateEvent, 
    deleteEvent,
    getTopEvents,
    uploadEventPhoto
} from '../controllers/event.controller.js';
import multer from 'multer';

const router = express.Router();

// Set up multer storage and filename configuration (you can move this to a separate file if needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');  // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });

router.post('/create-event', createEvent); // Handle file upload for event creation
router.post("/upload-photo", upload.single("photo"), uploadEventPhoto);
router.get("/dashboard", getTopEvents);
router.get("/filter", getEventByFilter);
router.get('/all-event', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get a specific event by ID
router.get('/user/:id', getEventByUser);

router.put('/update-event/:id', updateEvent);
router.put('/delete-event/:id', deleteEvent);


export default router;
