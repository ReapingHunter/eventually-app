import express from 'express';
import { 
    createNotification,
    getNotificationsByUser,
    markNotificationAsRead
 } from '../controllers/notification.controller';

 const router = express.Router();

 router.post("/notification", createNotification);
 router.get("/notification/:userid", getNotificationsByUser);
 router.put("/notification/:notification_id/read", markNotificationAsRead);

 export default router;