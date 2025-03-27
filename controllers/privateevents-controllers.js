import initKnex from "knex";
import config from "../knexfile.js";
import moment from 'moment-timezone';

const knex = initKnex(config);

// GET all private events
export const getAllPrivateEvents = async (req, res) => {
    try {
        const events = await knex("PrivateEvents").select("*");
        
        // Convert event_date to 12-hour format in EST
        const updatedEvents = events.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedEvents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch private events" });
    }
};

// GET a single private event by ID
export const getPrivateEventById = async (req, res) => {
    try {
        const event = await knex("PrivateEvents").where({ id: req.params.id }).first();
        if (!event) {
            return res.status(404).json({ error: "Private event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the private event" });
    }
};


// POST single private event 
export const createPrivateEvent = async (req, res) => {
    try {

        const { title, description, event_date, location, host } = req.body; // Added host field
        const user_id = req.body.user_id; // Extract user_id from FormData

        // Validate required fields
        if (!user_id) {
            console.log("❌ User ID is missing in request body");
            return res.status(400).json({ error: "User ID is required" });
        }

        if (!host) {
            console.log("❌ Host is missing in request body");
            return res.status(400).json({ error: "Host is required" });
        }

        console.log("✅ Received User ID:", user_id);
        console.log("✅ Received Host:", host);

        // Handle the image if available
        const image = req.file ? req.file.filename : null;

        // Insert into PrivateEvents table
        await knex("PrivateEvents").insert({
            title,
            description,
            event_date,
            location,
            host,
            image,
            user_id,
        });

        // Retrieve the last inserted ID (MySQL-specific)
        const privateEventId = await knex("PrivateEvents").max('id as maxId').first();

        // Log the private event ID
        console.log("Private Event ID:", privateEventId.maxId);  // Log the maxId for debugging

        // Insert into Events table with event_type as 'private' using the same event ID
        await knex("Events").insert({
            id: privateEventId.maxId, // Use the maxId from PrivateEvents
            title,
            description,
            event_date,
            location,
            host,
            event_type: 'private', // Set event_type to 'private'
            image,
            user_id,
        });

        // Retrieve and return the newly created private event
        const newPrivateEvent = await knex("PrivateEvents").where({ id: privateEventId.maxId }).first();
        res.status(201).json(newPrivateEvent);

    } catch (error) {
        console.error("❌ Error creating private event:", error);
        res.status(500).json({ error: "Failed to create private event" });
    }
};



// GET private events for a specific user
export const getPrivateEventsByUserId = async (req, res) => {
    const { userId } = req.params; 

    try {
        const events = await knex("PrivateEvents").where({ user_id: userId }).select("*");

        if (events.length === 0) {
            return res.status(404).json({ message: "No private events found for this user." });
        }

        // Convert event_date to 12-hour format in EST
        const updatedEvents = events.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedEvents);
    } catch (error) {
        console.error("❌ Error fetching private events by user ID:", error);
        res.status(500).json({ error: "Failed to fetch private events" });
    }
};



// DELETE a private event by ID
export const deletePrivateEvent = async (req, res) => {
    try {
        const rowsDeleted = await knex("PrivateEvents").where({ id: req.params.id }).del();
        if (rowsDeleted) {
            res.status(200).json({ message: "Private event deleted successfully" });
        } else {
            res.status(404).json({ error: "Private event not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete private event" });
    }
};

export default { getAllPrivateEvents, getPrivateEventById, createPrivateEvent, deletePrivateEvent, getPrivateEventsByUserId };
