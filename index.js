import "dotenv/config";
import express from "express";
import cors from "cors";
import initKnex from "knex";
import config from "./knexfile.js"
import PublicEventRoutes from "./routes/publicevent-routes.js";
import UsersRoutes from "./routes/users-routes.js"
import RSVPRoutes from "./routes/rsvp-routes.js"


const app = express();
const PORT = process.env.PORT || 5050;
const knex = initKnex(config);

app.use(cors());
app.use(express.json());

//Add routes here
app.use("/api/publicevents", PublicEventRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/rsvp", RSVPRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
