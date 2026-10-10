import db from "../config/db.js";
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
    values (?,?,?,?,?,?)`,
    [name,email,gender,department,address,salary]   )
    return result.insertId
}
export const fullyupdateemployee=async(data,id)=>{
    const {name,email,gender,department,address,salary}=data
    const [result]=await db.query(`UPDATE EMPLOYEES SET 
     name=?,email=?,gender=?,department=?,address=?,salary=? where id=?`,
     [name, email, gender, department, address, salary,id] )

     return result.affectedRows;
}
export const partiallyupdateemployee=async(data,id)=>{
  const fields=[]
  const values=[]
  const allowedfields=[`name`,`email`,`gender`,`department`,`address`,`salary`]
   for(const i of allowedfields){
    if(data[i]!=undefined){
        fields.push(`${i}=?`)
        values.push(data[i])
    }
   }
   if(fields.length==0){
    return 0;
   }
   values.push(id);

    const [result] = await db.query(
        `UPDATE employees SET ${fields.join(", ")} WHERE id = ?`,
        values
    );

    return result.affectedRows;
}
export const deleteemployee=async(id)=>{
    const[result]=await db.query(`Delete from employees where id = ?`,[id]);
    return result.affectedRows
}