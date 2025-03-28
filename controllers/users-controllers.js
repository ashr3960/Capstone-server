import initKnex from "knex"; 
import config from "../knexfile.js"; 
import bcrypt from "bcryptjs"; 

const knex = initKnex(config);

// POST: Create a new user
export const createUser = async (req, res) => {
    try {
        const { fullName, email, password, username } = req.body;

        const existingUser = await knex("Users").where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await knex("Users").insert({
            full_name: fullName, 
            email,
            password: hashedPassword,
            username,
        }).returning("*");

        // Exclude the password from the response
        const { password: _, ...userData } = newUser;

        res.status(201).json(userData);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};


// POST: Login an existing user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await knex("Users").where({ email }).first();
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Exclude the password from the response
        const { password: _, ...userData } = user;

        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to log in user" });
    }
};


// GET: Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await knex("Users").select("*");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};


// GET: Get events associated with a specific user
export const getUserEvents = async (req, res) => {
    try {
      const userId = req.params.id;  
  
      // Fetch the user from the database
      const user = await knex("Users").where({ id: userId }).first();
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if user is authorized 
      if (user.is_authorized) {
        // Fetch public events for authorized users
        const publicEvents = await knex("PublicEvents")
          .where({ user_id: userId })
          .select("*");
  
        return res.status(200).json({ publicEvents });
      } else {
        // Fetch private events for non-authorized users
        const privateEvents = await knex("PrivateEvents")
          .where({ user_id: userId })
          .select("*");
  
        return res.status(200).json({ privateEvents });
      }
    } catch (error) {
      console.error("Error fetching user events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  };

export default { createUser, getAllUsers, loginUser, getUserEvents };
