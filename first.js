import express from "express"
import employees from "./employees.json" with { type: "json" };
import db from "./config/db.js";
const app=express();
const port=8000;
app.use(express.json())

db.query("SELECT 1")
    .then(() => {
        console.log("MySQL connected successfully");
    })
    .catch((error) => {
        console.log("MySQL connection failed");
        console.log(error.message);
    });

app.get("/", (req, res) => {
    res.send("Employee MySQL API is working");
});

app.get("/employees",async(req,res)=>{
     try{
        const [employees]=await db.query("Select * from employees")
        res.json(employees)
     }
    catch(error){
       res.status(500).json({
        message:"Failed to fetch employees",
        error:error.message
       })
    }
})

app.get("/employees/:id",async(req,res)=>{
    try{
       const id=req.params.id
       const [employees]=await db.query("select * from employees where id=?", [id])
       if(employees.length==0){
        return res.status(404).json({
            message:"Employee not found"
        })
       }
       res.json(employees[0])
    }
    catch(error){
           res.status(500).json({
            message: "Failed to fetch employee",
            error: error.message
        });
    }
})

app.post("/employees",async(req,res)=>{
    try{
    const { name, email, gender, department, address, salary }=req.body
       const [result] = await db.query(
            `INSERT INTO employees 
            (name, email, gender, department, address, salary)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, gender, department, address, salary]
        );
         res.status(201).json({
            message: "Employee created successfully",
            employeeId: result.insertId
        });

        

}catch(error){
     res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
}
})

app.put("/employees/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const { name, email, gender, department, address, salary }=req.body
        const [result]=await db.query(`UPDATE EMPLOYEES SET 
            name=?,email=?,gender=?,department=?,address=?,salary=? where id=?`,
           [name, email, gender, department, address, salary,id] )

        if(result.affectedRows==0){
             return res.status(404).json({
                message: "Employee not found"
            });
                   
        } 
        res.status(200).json({
            message: "Employee updated successfully",
            employeeId: id
        }); 
    }catch(error){
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
})

app.patch("/employees/:id",async(req,res)=>{
try{
    const id=req.params.id
    const { name, email, gender, department, address, salary }=req.body
    const fields=[]
    const values=[]
    if(name!=undefined){
        fields.push(`name=?`)
        values.push(name);
    }
    if(email!=undefined){
        fields.push(`email=?`)
        values.push(email)
    }
    if(gender!=undefined){
        fields.push(`gender=?`)
        values.push(gender)
    }
    if(department!=undefined){
        fields.push(`department=?`)
        values.push(department)
    }
    if(address!=undefined){
        fields.push(`address=?`)
        values.push(address)
    }
    if(salary!=undefined){
        fields.push(`salary=?`)
        values.push(salary)
    }
     if (fields.length == 0) {
            return res.status(400).json({
                message: "No fields provided for update"
            });
        }
     values.push(id);
     const [result] = await db.query(
    `UPDATE employees
     SET ${fields.join(", ")}
     WHERE id = ?`,
    values
);
      if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json({
            message: "Employee updated successfully",
            employeeId: id
        });

}catch(error){
     res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
}

})

app.delete("/employees/:id",async(req,res)=>{
try{
    const id=req.params.id
    const[result]=await db.query(`Delete from employees where id =?`,[id])

    if (result.affectedRows == 0) {

            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json({

            message:"Employee deleted successfully",
            employeeId:id
        })

 
}catch (error) {

        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
})

app.listen(port,()=>{
    console.log(`Server is started at ${port}`)
})




























// // app.[http function like get,put,post etc.]('route',callback function);
// // app.get('/',(req,res) => {
// //  res.send("This server is made with express.js");
// // })
// // app.post('/',(req,res)=>{
// //     let body=req.body
// //     console.log(body)
// //     res.send("Data added to server");
// // })
// app.get('/employees',(req,res)=>{
//     res.json(employees);
// })
// app.get('/employees/:id',(req,res)=>{
//     let id=req.params.id
//     let existingemployee=employees.find((employees)=>employees.id==id);
// if(!existingemployee){
//     return res.send("404 Not found")
// }
//     res.json(existingemployee);
// })
// // app.get('/search',(req,res)=>{
// //     let query=req.query;
// //     res.json(query);

// // })
// app.post('/employees',(req,res)=>{
//         const newEmployee = {
//         id: employees.length + 1,
//         name: req.body.name,
//         age: req.body.age,
//         department: req.body.department,
//         position: req.body.position,
//         salary: req.body.salary,
//         city: req.body.city
//     }
//     employees.push(newEmployee);
//     res.json(newEmployee);
// })

// app.put('/employees/:id',(req,res)=>{
//     const id=req.params.id;
//     const employee=employees.find(employee=>employee.id==id);
// if(!employee){
//     return res.send("404 Not found")
// }
//     employee.name = req.body.name;
//     employee.age = req.body.age;
//     employee.department = req.body.department;
//     employee.position = req.body.position;
//     employee.salary = req.body.salary;
//     employee.city = req.body.city;

//     res.json(employee);
// })

// app.patch('/employees/:id',(req,res)=>{
//     const id=req.params.id;
//     let employee=employees.find(employee=>employee.id==id)
// if (!employee) {
//     return res.status(404).send("404 not found");
// }
//     if(req.body.salary != undefined){
//       employee.salary=req.body.salary;
//     }
//     if (req.body.position != undefined) {
//         employee.position = req.body.position;
//     }
//     if (req.body.city != undefined){
//         employee.city = req.body.city;
//     }
//     if (req.body.department != undefined){
//         employee.department = req.body.department;
//     }
//     if (req.body.age != undefined){
//         employee.age=req.body.age;
//     }
//     res.json(employee)
// })
// app.delete('/employees/:id',(req,res)=>{
//  const id=req.params.id;
//  const index=employees.findIndex(employee=>employee.id==id);
//     if (index === -1) {
//         return res.status(404).json({
//             message: "Employee not found"
//         });
//     }
//      const deletedEmployee = employees.splice(index, 1);

//     res.json({
//         message: "Employee deleted successfully",
//         employee: deletedEmployee[0]
//     });
// })

















// This code tells about how we can create a server and routes with the help of node.js and http module

// import http from 'http'
// const port=8000;
// const server=http.createServer((req,res)=>{
//    if(req.url=='/'){
//     res.end("Welcome to home page");
//    }
//    else if(req.url=="/about"){
//     res.end("This is about route of a demo server")
//    } 
//    else if(req.url=="/contact"){
//        res.end("This is a contact route of a demo server")
//    }
//    else{
//     res.end("404 Not found")
//    }
// })
// server.listen(port,()=>{
//     console.log("server is started")
// })
