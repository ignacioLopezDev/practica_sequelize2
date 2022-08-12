const express = require("express");
const { Users, Pages } = require("../models");
const users = express.Router();

users.get("/", (req, res, next) => {
  Users.findAll()
    .then((results) => res.send(results))
    .catch(next);
});

users.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Pages.findAll({ where: { authorId: id } })
    .then((result) => res.send(result))
    .catch(next);
});


users.get("/:urlTitle", (req, res, next) => {
    const { urlTitle } = req.params;
    Pages.findOne({
      where: { urlTitle },
      include: { model: Users, as: 'author' },
    })
      .then((result) => {
        if (!result) return next("No se encontró");
        res.send(result);
      })
      .catch(next);
  });

module.exports = users;




