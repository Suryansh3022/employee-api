import express from "express"
import employees from "./employees.json" with { type: "json" };
const app=express();
const port=8000;
app.use(express.json())
// app.[http function like get,put,post etc.]('route',callback function);
// app.get('/',(req,res) => {
//  res.send("This server is made with express.js");
// })
// app.post('/',(req,res)=>{
//     let body=req.body
//     console.log(body)
//     res.send("Data added to server");
// })
app.get('/employees',(req,res)=>{
    res.json(employees);
})
app.get('/employees/:id',(req,res)=>{
    let id=req.params.id
    let existingemployee=employees.find((employees)=>employees.id==id);
if(!existingemployee){
    return res.send("404 Not found")
}
    res.json(existingemployee);
})
// app.get('/search',(req,res)=>{
//     let query=req.query;
//     res.json(query);

// })
app.post('/employees',(req,res)=>{
        const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        age: req.body.age,
        department: req.body.department,
        position: req.body.position,
        salary: req.body.salary,
        city: req.body.city
    }
    employees.push(newEmployee);
    res.json(newEmployee);
})

app.put('/employees/:id',(req,res)=>{
    const id=req.params.id;
    const employee=employees.find(employee=>employee.id==id);
if(!employee){
    return res.send("404 Not found")
}
    employee.name = req.body.name;
    employee.age = req.body.age;
    employee.department = req.body.department;
    employee.position = req.body.position;
    employee.salary = req.body.salary;
    employee.city = req.body.city;

    res.json(employee);
})

app.patch('/employees/:id',(req,res)=>{
    const id=req.params.id;
    let employee=employees.find(employee=>employee.id==id)
if (!employee) {
    return res.status(404).send("404 not found");
}
    if(req.body.salary != undefined){
      employee.salary=req.body.salary;
    }
    if (req.body.position != undefined) {
        employee.position = req.body.position;
    }
    if (req.body.city != undefined){
        employee.city = req.body.city;
    }
    if (req.body.department != undefined){
        employee.department = req.body.department;
    }
    if (req.body.age != undefined){
        employee.age=req.body.age;
    }
    res.json(employee)
})
app.delete('/employees/:id',(req,res)=>{
 const id=req.params.id;
 const index=employees.findIndex(employee=>employee.id==id);
    if (index === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }
     const deletedEmployee = employees.splice(index, 1);

    res.json({
        message: "Employee deleted successfully",
        employee: deletedEmployee[0]
    });
})

app.listen(port,()=>{
    console.log(`Server is started at ${port}`)
})















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
