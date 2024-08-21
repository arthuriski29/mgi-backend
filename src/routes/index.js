const router = require("express").Router()
// const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "mgi-backend is running well"
    })
})

router.use("/upload", require("./upload.router"))
router.use("/import", require("./import.router"))
// router.use("/admin", authMiddleware, require("./admin/admin.router"))

router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router
