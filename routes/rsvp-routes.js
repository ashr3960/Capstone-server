import express from "express";
import rsvpControllers from "../controllers/rsvp-controllers.js";

const router = express.Router();

router.post("/", rsvpControllers.rsvpToEvent);
router.get("/:id", rsvpControllers.getUserRSVPEvents); 

export default router;