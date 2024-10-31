const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.myFunction);

routes.get("/ttech", myController.myFunction2);

module.exports = routes;
