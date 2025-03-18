import initKnex from "knex";
import config from "../knexfile.js";

const knex = initKnex(config);

// GET all public events
export const getAllEvents = async (req, res) => {
  try {
    const events = await knex("PublicEvents").select("*");
    res.status(200).json(events);
  } catch (error) {
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

export default { getAllEvents, getEventById, createEvent, deleteEvent };
