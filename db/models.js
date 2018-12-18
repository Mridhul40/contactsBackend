const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = {
  contact: {
    firstname:{
      type: DT.STRING,
      unique: false,
      allowNull: false,
      required: [true, "cannot be blank"]
    },
    lastname: {
      type: DT.STRING,
      unique: false,
      allowNull: false,
      required: [true, "cannot be blank"]
    },
    number: {
      type: DT.STRING,
      unique: true,
      allowNull: false,
      required: [true, "cannot be blank"]
    }
  },
  message: {
    content: {
      type: DT.STRING,
      unique: true,
      allowNull: false,
      required: [true, "cannot be blank"]
    },
    datetime: {
      type: DT.STRING,
      unique: false,
      required: [true, "cannot be blank"]
    }
  }
}
