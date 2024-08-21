const importRouter = require("express").Router()
const importController = require("../controllers/import.controller")

importRouter.get("/", importController.getAll)
importRouter.post("/:filename", importController.importCSV)

module.exports = importRouter