import initKnex from "knex";
import config from "../knexfile.js";
import moment from 'moment-timezone';

const knex = initKnex(config);

// GET all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await knex("Events").select("*");
        
        // Convert event_date to 12-hour format in EST
        const updatedEvents = events.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedEvents);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

// GET a single event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await knex("Events").where({ id: req.params.id }).first();
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Convert event_date to 12-hour format in EST
        event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');

        res.status(200).json(event);
    } catch (error) {
        console.error("❌ Error fetching event:", error);
        res.status(500).json({ error: "Failed to fetch event" });
    }
};


// export const createEvent = async (req, res) => {
//     try {
//         console.log("Incoming Request Body:", req.body);
//         console.log("Incoming Request Files:", req.file);

//         const { id, title, description, event_date, location, host, event_type } = req.body;
//         const user_id = req.body.user_id;

//         // Check if all required fields are present
//         if (!id) {
//             console.log("❌ ID is missing in request body");
//             return res.status(400).json({ error: "Event ID is required" });
//         }

//         if (!user_id) {
//             console.log("❌ User ID is missing in request body");
//             return res.status(400).json({ error: "User ID is required" });
//         }

//         if (!host) {
//             console.log("❌ Host is missing in request body");
//             return res.status(400).json({ error: "Host is required" });
//         }

//         if (!event_type) {
//             console.log("❌ Event type is missing in request body");
//             return res.status(400).json({ error: "Event type is required" });
//         }

//         console.log("✅ Received ID:", id);
//         console.log("✅ Received User ID:", user_id);
//         console.log("✅ Received Host:", host);
//         console.log("✅ Received Event Type:", event_type);

//         // Handle the image if available
//         const image = req.file ? req.file.filename : null;

//         // Insert the event with the provided ID
//         await knex("Events").insert({
//             id, // Use the ID passed from the frontend
//             title,
//             description,
//             event_date,
//             location,
//             host,
//             event_type,
//             image,
//             user_id,
//         });

//         // Retrieve and return the newly inserted event
//         const newEvent = await knex("Events").where({ id }).first();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error("❌ Error creating event:", error);
//         res.status(500).json({ error: "Failed to create public event" });
//     }
// };

export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Log the ID to ensure it's coming through correctly
        console.log("Event ID to delete:", eventId);

        if (!eventId) {
            return res.status(400).json({ error: "Event ID is required" });
        }

        // Delete the event from the Events table
        const rowsDeleted = await knex("Events").where({ id: eventId }).del();

        if (rowsDeleted) {
            res.status(200).json({ message: "Event deleted successfully" });
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("❌ Error deleting event:", error);
        res.status(500).json({ error: "Failed to delete event" });
    }
};


export default { getAllEvents, getEventById, deleteEvent };
