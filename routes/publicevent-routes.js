import express from "express";
import PublicEventsController from "../controllers/publicevents-controllers.js";

const router = express.Router();

// GET all public events
router.get("/", PublicEventsController.getAllEvents);

// GET all public events within the next two weeks
router.get("/upcomingevents", PublicEventsController.getUpcomingEvents);

// GET a single event by ID
router.get("/:id", PublicEventsController.getEventById);

// POST a new public event
router.post("/", PublicEventsController.createEvent);

// DELETE an event by ID
router.delete("/:id", PublicEventsController.deleteEvent);

export default router;
