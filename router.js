import express from "express";
import{
    getallemployees,
    getemployeebyID,
    addanemployee,
    fullyupdateemployee,
    partiallyupdateemployee,
    deleteemployee
}from "./DAL/employeeDAL.js";
const router = express.Router();
router.get("/employees",async(req,res)=>{
    try{
           const employees=await getallemployees()
           res.status(200).json(employees)
    }catch(error){
         console.log("error")
         res.status(500).json({message:"Server error"})
    }
})
router.get("/employees/:id",async(req,res)=>{
    try{
        const employees=await getemployeebyID(req.params.id);
        if(!employees){
           return res.status(404).json({message:"employee not found"})
        }
        res.status(200).json(employees);
        
    }catch(error){
        console.log("Error")
        res.status(500).json({message:"Server Error"})
    }
    
})
router.put("/employees/:id",async (req,res)=>{
    try{
    const id=req.params.id
    const data=req.body
    const affectedrows=await fullyupdateemployee(data,id)
    if(affectedrows==0){
        return res.status(404).json({message:"Employee not found to update"})
    }
    res.status(200).json({message:"updated successfully"})
    }catch(error){
        console.log("Error")
        res.status(500).json({Message:"server error"})
    }
})
router.post("/employees",async(req,res)=>{
try{
    const data=req.body
    const employees=await addanemployee(data)
    res.status(201).json({message:"Employee added successfully",id:employees})
}catch(error){
    console.log("error")
    res.status(500).json({message:"server error"})
}
})
router.patch("/employees/:id",async(req,res)=>{
try{
    const id=req.params.id
    const data=req.body
    const affectedrows= await partiallyupdateemployee(data,id)
    if(affectedrows==0){
       return res.status(404).json({message:"Employee not found to update"})
    }
    res.status(200).json({message:"Employee updated successfully"})
}catch(error){
       console.log(error)
       res.status(501).json({Message:"Server error"})
}

})
router.delete("/employees/:id",async(req,res)=>{
try{
    const affectedrows=await deleteemployee(req.params.id)
    if(affectedrows==0){
       return  res.status(404).json({message:"employee not found to delete"})
    }
    res.status(200).json({message:"employee deleted successfully"})
}catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
}
})
export default router