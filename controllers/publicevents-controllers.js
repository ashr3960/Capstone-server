import initKnex from "knex";
import config from "../knexfile.js";
import moment from 'moment-timezone';

const knex = initKnex(config);

// GET all public events
export const getAllEvents = async (req, res) => {
    try {
        const events = await knex("PublicEvents").select("*");
        
        // Convert event_date to 12-hour format in EST
        const updatedEvents = events.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedEvents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

// GET upcoming events within 4 months
export const getUpcomingEvents = async (req, res) => {
    try {
        const currentDate = knex.fn.now();
        const fourMonthsLater = knex.raw("DATE_ADD(?, INTERVAL 4 MONTH)", [currentDate]);

        const events = await knex("PublicEvents")
            .where("event_date", ">=", currentDate)
            .andWhere("event_date", "<=", fourMonthsLater)
            .orderBy("event_date", "asc");

        // Convert event_date to 12-hour format in EST
        const updatedEvents = events.map(event => {
            event.event_date = moment.utc(event.event_date).tz('America/New_York').format('YYYY-MM-DD hh:mm A');
            return event;
        });

        res.status(200).json(updatedEvents);
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
};


// GET a single event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await knex("PublicEvents").where({ id: req.params.id }).first();
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the event" });
    }
};

// POST a new public event
export const createEvent = async (req, res) => {
    try {
        const [id] = await knex("PublicEvents").insert(req.body);
        const newEvent = await knex("PublicEvents").where({ id }).first();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
};

// DELETE an event by ID
export const deleteEvent = async (req, res) => {
    try {
        const rowsDeleted = await knex("PublicEvents").where({ id: req.params.id }).del();
        if (rowsDeleted) {
            res.status(200).json({ message: "Event deleted successfully" });
        } else {
        res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};

export default { getAllEvents, getUpcomingEvents, getEventById, createEvent, deleteEvent };
