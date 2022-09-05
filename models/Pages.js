const S = require("sequelize");
const db = require("../db");

class Pages extends S.Model {
  // metodo de clase (con el static)
  static findByTag(tag) {
    // usaremos "Operators" de Postgress. Si alguno de los tag mactchea con el que tag que estoy buscando, aceptalo:
    return Pages.findAll({
      where: {
        tags: {
          [S.Op.overlap]: [tag],
        },
      },
    });
  }

  // Metodo de instancia
  findSimilar() {
    return Pages.findAll({
      where: {
        id: {
          [S.Op.not]: this.id,
        },
        tags: {
          [S.Op.overlap]: this.tags,
        },
      },
    });
  }
}

Pages.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    urlTitle: {
      type: S.STRING,
      allowNull: false,
    },
    content: {
      type: S.TEXT,
      allowNull: false,
    },
    route: {
      type: S.VIRTUAL,
      get() {
        return `/wiki/${this.getDataValue("urlTitle")}`;
      },
    },
    tags: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
      set: (tags) => {
        tags = tags || [];
        if (typeof tags === "string") {
          tags = tags.split(",").map((str) => {
            return str.trim();
          });
        }
        this.setDataValue("tags", tags);
      },
    },
  },
  { timestamps: false, sequelize: db, modelName: "pages" }
);

// hook de url_title
Pages.beforeValidate((page, options) => {
  if (page.title) {
    page.urlTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
    options.fields.push("urlTitle");
  }
});

module.exports = Pages;
