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
app.get('/search',(req,res)=>{
    let query=req.query;
    res.json(query);

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
