const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  Tutorial.create(req)
    .then((data) => {
      return data._previousDataValues;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.all = async (req, res) => {
  await Tutorial.findAll()
    .then((data) => {
      list = data;
    })
    .catch((err) => {
      console.log(err);
    });
  return list;
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};
