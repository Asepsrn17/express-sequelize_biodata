const express = require("express");
const cors = require("cors");
const app = express();

let corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("sync db");
  })
  .catch((err) => {
    console.log("failed to sync db: " + err.message);
  });

const biodata = require("./app/controllers/biodata_controller");

app.post("/biodata", (req, res) => {
  biodata.createBiodata(req, res);
});

app.get("/biodata", (req, res) => {
  biodata.findAll(req, res);
});

app.get("/biodata/:id", (req, res) => {
  biodata.findById(req, res);
});

app.put("/biodata/update/:id", (req, res) => {
  biodata.update(req, res);
});

app.delete("/biodata/delete/:id", (req, res) => {
  biodata.delete(req, res);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
