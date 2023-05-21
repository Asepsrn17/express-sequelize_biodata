const db = require("../models");
const Biodata = db.biodata;

exports.createBiodata = (req, res) => {
  const { name, placeBirth, dateBirth, address } = req.body;
  db.sequelize
    .query(
      `INSERT INTO person_data(name, placeBirth, dateBirth, address, createdAt, updatedAt) VALUES('${name}', '${placeBirth}', '${dateBirth}', '${address}', NOW(), NOW())`
    )
    .then(() => {
      res.send("Biodata created successfully");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the biodata.",
      });
    });
};

exports.findAll = (req, res) => {
  db.sequelize
    .query("SELECT * FROM person_data", {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Biodata not found");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding all biodata",
      });
    });
};

exports.findById = (req, res) => {
  db.sequelize
    .query("SELECT * FROM person_data WHERE id = :id", {
      replacements: {
        id: req.params.id,
      },
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({
          message: `Biodata with id ${req.params.id} not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding biodata",
      });
    });
};

exports.update = (req, res) => {
  const { name, placeBirth, dateBirth, address } = req.body;
  db.sequelize.models.person_data
    .update(
      {
        name,
        placeBirth,
        dateBirth,
        address,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).send({
          message: `Biodata with ID ${req.params.id} not found`,
        });
      } else {
        res.send({ message: "Biodata updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while updating biodata",
      });
    });
};

exports.delete = (req, res) => {
  Biodata.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if (data === 0) {
      res.status(404).send({
        message: `Biodata with Id ${req.params.id} not found!`,
      });
      return;
    }

    res.status(200).send({
      message: `Success delete biodata with Id ${req.params.id} !`,
    });
  });
};
