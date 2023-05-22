const express = require("express");
const cors = require("cors");
const router = express.Router();

let corsOptions = {
  origin: "http://localhost:3000",
};

router.use(cors(corsOptions));
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

const biodata = require("../controllers/biodata_controller");

router.post("/", (req, res) => {
  biodata.create(req, res);
});

router.get("/", (req, res) => {
  biodata.findAll(req, res);
});

router.get("/:id", (req, res) => {
  biodata.findOne(req, res);
});

router.put("/update/:id", (req, res) => {
  biodata.update(req, res);
});

router.delete("/delete/:id", (req, res) => {
  biodata.delete(req, res);
});

module.exports = router;
