import express from "express";
import PublicEventsController from "../controllers/publicevents-controllers.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

// GET all public events
router.get("/", PublicEventsController.getAllPublicEvents);

// GET all upcoming public events within the next four months
router.get("/upcomingevents", PublicEventsController.getUpcomingPublicEvents);

// GET a single public event by ID
router.get("/:id", PublicEventsController.getPublicEventById);

// GET events for a specific user
router.get("/user/:userId", PublicEventsController.getPublicEventsByUserId);

// POST a new public event (with image upload)
router.post("/", upload.single("image"), PublicEventsController.createPublicEvent);

// DELETE a public event by ID
router.delete("/:id", PublicEventsController.deletePublicEvent);

export default router;
