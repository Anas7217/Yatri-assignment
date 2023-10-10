const Router=require("express");
const mongoose=require("mongoose");
const User=require("../models/user");

const router=Router();



//Add a data
router.post("/",async(req,res)=>{
    const {fullname,email,password}=req.body;
    try{
        await User.create({
            fullname,
            email,
            password,
        })
        return res.redirect("/")
    }catch{
        console.log("Error",Error)
    }
})


// Get All users
router.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      return res.render('showData',{
        users
      })
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Something went wrong!");
    }
  });
  router.post("/edit", async (req, res) => {
    try {
    //   const userId = req.params.id;
      const {id, fullname, email, password } = req.body;
    //   console.log(id)
    //   console.log(fullname)
  
      // Check if the provided userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if(fullname)
        user.fullname = fullname;
      if(email)
        user.email = email;
       if(password)
        user.password = password;
  
      const updatedUser = await user.save();
      return res.redirect("/users");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });



// Get a user by user id
  router.get("/users/:id",async(req,res)=>{
     try{
        const id=req.params.id
        const user=await User.findById(id);
        return res.render("getUserById",{
            user  
        }) 
     }catch(error){
        console.log("err",error)
     }

  })


// delete a user by id
router.post('/delete-product', async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(referenceNo);
        if (!mongoose.Types.ObjectId.isValid(id)) {
                 return res.status(400).json({ error: "Invalid user ID" });
         }
        await User.deleteOne({ _id: id }); // Assuming the 'refrenceNo' is the document _id
        //   alert("data deleted Successfully");
        // res.json({ success: true });
          res.redirect('/users');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
});




module.exports=router;