import express from "express";
import PrivateEventsController from "../controllers/privateevents-controllers.js"; 
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

// GET all private events
router.get("/", PrivateEventsController.getAllPrivateEvents);

// GET a single private event by ID
router.get("/:id", PrivateEventsController.getPrivateEventById);

// GET events for a specific user
router.get("/user/:userId", PrivateEventsController.getPrivateEventsByUserId);

// POST a new private event (with image upload)
router.post("/", upload.single("image"), PrivateEventsController.createPrivateEvent);

// DELETE a private event by ID
router.delete("/:id", PrivateEventsController.deletePrivateEvent);

export default router;
