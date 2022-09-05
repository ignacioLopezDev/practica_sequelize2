const express = require("express");
const { Pages, Users } = require("../models");
const pages = express.Router();

pages.get("/", (req, res, next) => {
  console.log("funcionó la ruta GET");
  Pages.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch(next);
});

pages.post("/", (req, res, next) => {
  console.log("este es el req.body", req.body);
  const { name, email } = req.body;
  Users.findOrCreate({ where: { name, email } })
    .then((result) => {
      console.log("ESTE ES EL AUTHOR", result);
      const author = result[0];
      Pages.create(req.body)
        .then((newPost) => newPost.setAuthor(author))
        .then((newPost) => res.send(newPost));
    })
    .catch(next);
});

pages.get("/:urlTitle", (req, res, next) => {
  console.log("ESTE ES REQ.PARAMS", req.params);
  const { urlTitle } = req.params;
  Pages.findOne({ where: { urlTitle } })
    .then((result) => res.send(result))
    .catch(next);
});

pages.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Pages.destroy({ where: { id } })
    .then(() => res.send("se eliminó"))
    .catch(next);
});

pages.put("/:urlTitle", (req, res, next) => {
  const { urlTitle } = req.params;
  Pages.update(req.body, { where: { urlTitle }, returning: true })
    .then(([affectedRows, update]) => {
      console.log(update[0]);
      res.send(update[0]);
    })
    .catch(next);
});

pages.get("/:urlTitle", (req, res, next) => {
  const { urlTitle } = req.params;
  Pages.findOne({
    where: { urlTitle },
    include: { model: Users, as: "author" },
  })
    .then((result) => {
      if (!result) return next("No se encontró");
      res.send(result);
    })
    .catch(next);
});

pages.get("/search/:tag", (req, res) => {
  Pages.finfByTag(req.params.tag).then((pages) => {
    res.send(pages);
  });
});

pages.get("/:urlTitle/similar", (req, res) => {
  Pages.findAll({
    where: { urlTitle: req.params.urlTitle },
  })
    .then((page) => {
      return page.findSimilar();
    })
    .then((pages) => {
      res.send(pages);
    });
});

module.exports = pages;
