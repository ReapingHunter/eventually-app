import express from "express";
import {
    createRSVP,
    getRSVPsByEvent,
    getRSVPsByUser,
    updateRSVPStatus,
  } from "../controllers/rsvp.controller.js";

  const router = express.Router();

  router.post("/rsvp", createRSVP);                     // Create RSVP
  router.get("/rsvp/event/:event_id", getRSVPsByEvent); // Get RSVPs by event
  router.get("/rsvp/user/:user_id", getRSVPsByUser);    // Get RSVPs by user
  router.put("/rsvp/:rsvp_id", updateRSVPStatus);       // Update RSVP status
  
  export default router;