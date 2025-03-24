import initKnex from "knex"; 
import config from "../knexfile.js"; 

const knex = initKnex(config);

// POST: RSVP to an Event
export const rsvpToEvent = async (req, res) => {
    try {
        const { userId, eventId, eventType } = req.body; // added eventType to differentiate between public and private

        // Check if the event exists based on the eventType
        const eventTable = eventType === "private" ? "PrivateEvents" : "PublicEvents";
        const event = await knex(eventTable).where({ id: eventId }).first();

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if user has already RSVP'd
        const existingRSVP = await knex("RSVPs").where({ user_id: userId, event_id: eventId }).first();
        if (existingRSVP) {
            return res.status(400).json({ error: "You have already RSVP'd for this event" });
        }

        // Insert RSVP record
        await knex("RSVPs").insert({
            user_id: userId,
            event_id: eventId,
            confirmed: true,
        });

        res.status(201).json({ message: "RSVP successful!" });
    } catch (error) {
        console.error("Error RSVPing:", error);
        res.status(500).json({ error: "Failed to RSVP" });
    }
};


// GET: Get RSVP'd Events for a User
export const getUserRSVPEvents = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10); // Ensure it's an integer
        console.log(`Fetching RSVP'd events for user ID: ${userId}`);

        // Explicitly reference the table name for `user_id`
        const rsvpedEvents = await knex("RSVPs")
            .where("RSVPs.user_id", userId) // Explicitly reference RSVPs table
            .join("PublicEvents", "RSVPs.event_id", "PublicEvents.id")
            .select("PublicEvents.*"); 

        console.log("RSVP'd events:", rsvpedEvents);

        res.status(200).json(rsvpedEvents);
    } catch (error) {
        console.error("Error fetching RSVP'd events:", error);
        res.status(500).json({ error: "Failed to fetch RSVP'd events", details: error.message });
    }
};


export default {rsvpToEvent, getUserRSVPEvents};
