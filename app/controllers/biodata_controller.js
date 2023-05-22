const db = require("../models");
const Biodata = db.biodata;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not empety!",
    });
    return;
  }

  if (!req.body.nama) {
    res.status(400).send({
      message: "nama harus di isi!",
    });
    return;
  }
  if (!req.body["tempat lahir"]) {
    res.status(400).send({
      message: "tempat lahir harus di isi!",
    });
    return;
  }
  if (!req.body["tanggal lahir"]) {
    res.status(400).send({
      message: "tanggal lahir harus di isi!",
    });
    return;
  }
  if (!req.body.alamat) {
    res.status(400).send({
      message: "alamat harus di isi!",
    });
    return;
  }
  const biodata = {
    nama: req.body.nama,
    tempat_lahir: req.body["tempat lahir"],
    tanggal_lahir: req.body["tanggal lahir"],
    alamat: req.body.alamat,
  };

  Biodata.create(biodata)
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
  Biodata.findAll()
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

exports.findOne = (req, res) => {
  Biodata.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
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
  const {
    nama,
    "tempat lahir": tempat_lahir,
    "tanggal lahir": tanggal_lahir,
    alamat,
  } = req.body;
  db.sequelize.models.person_data
    .update(
      {
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((data) => {
      if (data[0] === 0) {
        res.status(404).send({
          message: `Biodata with Id ${req.params.id} not found`,
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
