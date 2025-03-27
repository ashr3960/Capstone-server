import initKnex from "knex";
import config from "../knexfile.js";
import moment from "moment-timezone";
import multer from "multer";

const knex = initKnex(config);
const upload = multer({ dest: "uploads/" });

// GET all public events
export const getAllPublicEvents = async (req, res) => {
    try {
        const publicEvents = await knex("PublicEvents").select("*");
        
        // Convert event_date to 12-hour format in EST
        const updatedPublicEvents = publicEvents.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedPublicEvents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch public events" });
    }
};

// GET upcoming public events within 4 months
export const getUpcomingPublicEvents = async (req, res) => {
    try {
        const currentDate = knex.fn.now();
        const fourMonthsLater = knex.raw("DATE_ADD(?, INTERVAL 4 MONTH)", [currentDate]);

        const publicEvents = await knex("PublicEvents")
            .where("event_date", ">=", currentDate)
            .andWhere("event_date", "<=", fourMonthsLater)
            .orderBy("event_date", "asc");

        // Convert event_date to 12-hour format in EST
        const updatedPublicEvents = publicEvents.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedPublicEvents);
    } catch (error) {
        console.error("Error fetching upcoming public events:", error);
        res.status(500).json({ error: "Failed to fetch public events" });
    }
};

// GET public events for a specific user
export const getPublicEventsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const publicEvents = await knex("PublicEvents").where({ user_id: userId }).select("*");

        if (publicEvents.length === 0) {
            return res.status(404).json({ message: "No public events found for this user." });
        }

        // Convert event_date to 12-hour format in EST
        const updatedPublicEvents = publicEvents.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedPublicEvents);
    } catch (error) {
        console.error("❌ Error fetching public events by user ID:", error);
        res.status(500).json({ error: "Failed to fetch public events" });
    }
};

// GET a single public event by ID
export const getPublicEventById = async (req, res) => {
    try {
        const publicEvent = await knex("PublicEvents").where({ id: req.params.id }).first();
        if (!publicEvent) {
            return res.status(404).json({ error: "Public event not found" });
        }
        res.status(200).json(publicEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the public event" });
    }
};

// POST a new public event (with image upload)
export const createPublicEvent = async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body);
        console.log("Incoming Request Files:", req.file);

        const { title, description, event_date, location, host } = req.body;

        if (!title || !description || !event_date || !location || !host) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user_id = req.body.user_id;

        if (!user_id) {
            console.log("❌ User ID is missing in request body");
            return res.status(400).json({ error: "User ID is required" });
        }

        // Save the uploaded image filename
        const image = req.file ? req.file.filename : null;

        // Insert the new event into the database
        const [id] = await knex("PublicEvents").insert({
            title,
            description,
            event_date,
            location,
            host,
            image,
            user_id, 
        });

        // Fetch the newly inserted event
        const newPublicEvent = await knex("PublicEvents").where({ id }).first();
        res.status(201).json(newPublicEvent);
    } catch (error) {
        console.error("❌ Error creating public event:", error);
        res.status(500).json({ error: "Failed to create public event" });
    }
};


// DELETE a public event by ID
export const deletePublicEvent = async (req, res) => {
    try {
        const rowsDeleted = await knex("PublicEvents").where({ id: req.params.id }).del();
        if (rowsDeleted) {
            res.status(200).json({ message: "Public event deleted successfully" });
        } else {
            res.status(404).json({ error: "Public event not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete public event" });
    }
};

export default { getAllPublicEvents, getPublicEventsByUserId, getUpcomingPublicEvents, getPublicEventById, createPublicEvent, deletePublicEvent };
