const importModel = require("../models/import.model")
const checkFileByName = require("../helpers/name-check.helper");
const { importCSVFile } = require("../helpers/import-to-db.helper");


exports.getAll = async (req, res) => {
  try {
      const imports = await importModel.findAll()
      if(!imports){
          throw Error("imports_not_found")
      }
      return res.json({
          success: true,
          message: "imports",
          results: imports
      })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "BAD REGUEST NOT FOUND",
  })
  }
}

exports.importCSV = async(req, res) => {

  try {
    const {filename} = req.params

    const checkFile = await checkFileByName(filename)
    console.log('check di controller', checkFile)
    if(!checkFile){
      return res.status(400).json({
        success: false,
        message: 'No filename found, or filename not uploaded yet',
      })
    }
   
    await importCSVFile(filename, res)
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred',
      error: error.message
  });
  }
  
  
}
   
      