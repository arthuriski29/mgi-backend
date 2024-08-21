const db = require("../helpers/db.helper")
const table = 'data_info'

exports.findAll = async function(row){
 

  const query = `
  SELECT * FROM (
    SELECT * FROM
    "${table}" 
    ORDER BY "id" DESC
    LIMIT $1
    ) AS subquery
  ORDER BY "id" ASC
  `
  const values = [row]
  const {rows} = await db.query(query, values)
  return rows
}

exports.insert = async function(data){
  const query = `
  INSERT INTO "${table}" 
  ("nama", "email", "telepon", "alamat") 
  VALUES ($1, $2, $3, $4) RETURNING *
  `  
  const values = [data.nama, data.email, data.telepon, data.alamat]   
  const {rows} = await db.query(query, values)
  return rows[0]
}