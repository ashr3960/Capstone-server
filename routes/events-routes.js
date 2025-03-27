import express from "express";
import EventsController from "../controllers/events-controllers.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

// GET all events
router.get("/", EventsController.getAllEvents);

// GET a single event by ID
router.get("/:id", EventsController.getEventById);

// // POST a single event
// router.post("/", upload.single("image"), EventsController.createEvent);

export default router;
