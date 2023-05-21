const express = require("express");
const app = express();
const router = require("./app/routes/biodata_routes");

app.use("/biodata/", router);

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("sync db");
  })
  .catch((err) => {
    console.log("failed to sync db: " + err.message);
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
