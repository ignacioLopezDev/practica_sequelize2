const S = require("sequelize");
const db = require("../db");

class Pages extends S.Model {}

Pages.init(
  {
    title: {
      type: S.STRING,
      allowNull:false
    },
    urlTitle: {
      type: S.STRING,
      allowNull:false
    },
    conten: {
      type: S.TEXT,
      allowNull:false
    },
  },
  { sequelize: db, modelName: "pages" }
);

module.exports = Pages;
