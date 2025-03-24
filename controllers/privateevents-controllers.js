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
        console.log("Incoming Request Body:", req.body);
        console.log("Incoming Request Files:", req.file); 

        const { title, description, event_date, location, host } = req.body; // Added host field
        const user_id = req.body.user_id; // Extract user_id from FormData

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

        // Save the uploaded image filename
        const image = req.file ? req.file.filename : null;

        // Insert the new event with the host field
        const [id] = await knex("PrivateEvents").insert({
            title,
            description,
            event_date,
            location,
            host, // Insert the host value into the database
            image,
            user_id,  
        });

        const newEvent = await knex("PrivateEvents").where({ id }).first();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("❌ Error creating event:", error);
        res.status(500).json({ error: "Failed to create private event" });
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

export default { getAllPrivateEvents, getPrivateEventById, createPrivateEvent, deletePrivateEvent };
