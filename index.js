import "dotenv/config";
import express from "express";
import cors from "cors";
import initKnex from "knex";
import config from "./knexfile.js";
import PublicEventRoutes from "./routes/publicevent-routes.js";
import UsersRoutes from "./routes/users-routes.js";
import RSVPRoutes from "./routes/rsvp-routes.js";
import PrivateEventRoutes from "./routes/privateevent-routes.js"; 
import UploadRoutes from "./routes/upload-routes.js";
import path from "path"; 
import { fileURLToPath } from 'url';  // Import for converting URL to path
import { dirname } from 'path';  // Import to get directory name from file path

// Get current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;
const knex = initKnex(config);

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Add routes here
app.use("/api/publicevents", PublicEventRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/rsvp", RSVPRoutes);
app.use("/api/privateevents", PrivateEventRoutes); 
app.use("/api", UploadRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
