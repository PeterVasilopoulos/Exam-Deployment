const express = require("express");
const cors = require("cors");

require("dotenv").config();
const port = process.env.DATABASE_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require("./configs/mongoose.config");

const Routes = require("./routes/note.routes");
Routes(app);

app.listen(port, () => console.log("Port connection established on:", port));