const uploadModel = require("../models/upload.model")

exports.uploadFile = (req, res) => {
  try {
    
    if(!(req.file)) {
      return res.status(400).json({
        success: false,
        message: 'file not found to upload'
      })
    }

    return res.status(200).json({
      success: true,
      message: "file uploaded",
      return : {
        name : req.file.originalname,
        size: req.file.size,
      },
  })
  } catch (error) {
    throw error
  }
}