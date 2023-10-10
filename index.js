const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const userRoute=require("./routes/user")

const app=express();
const PORT=8000

app.set("view engine","ejs");
app.set('views', path.resolve("./views"));
app.use(express.urlencoded({extended:false}))  // because we handle form data , so helps to convert form data to json format
 

mongoose.connect('mongodb://127.0.0.1:27017/yatree')
.then(()=>console.log("mongoose connected"))
.catch((err)=>console.log("Error",err));


app.get("/",(req,res)=>{
    res.render('form')
})


app.use("/",userRoute);

app.listen(PORT,()=>{
    console.log(`app started at ${PORT}`);
})