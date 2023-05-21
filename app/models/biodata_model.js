module.exports = (sequelize, Sequelize) => {
  const Biodata = sequelize.define("person_data", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    placeBirth: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    dateBirth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Biodata;
};
