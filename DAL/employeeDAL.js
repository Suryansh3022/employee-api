import db from "./config/db.js";
export const getallemployees = async() =>{
    const [rows] = await db.query(`Select * from employees`)
    return rows;
}
export const getemployeebyID=async(id)=>{
    const [rows]=await db.query(`Select * from employees where id = ?`,[id])
    return rows[0] 
}
export const addanemployee=async(data)=>{
  const {name, email, gender, department, address, salary}=data
  const [result]=await db.query(`Insert into employees
    (name, email, gender, department, address, salary)
    values {?,?,?,?,?,?}`,
    [name,email,gender,department,address,salary]   )
    return result.insertId
}