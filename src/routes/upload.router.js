const upload = require("../helpers/upload-csv.helper");
const uploadRouter = require("express").Router()
const uploadController = require("../controllers/upload.controller")

// uploadRouter.get("/", uploadController.getAll)
uploadRouter.post("/", upload.single("file"), uploadController.uploadFile)

module.exports = uploadRouter