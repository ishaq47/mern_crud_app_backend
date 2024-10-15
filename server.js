const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const app = express();
const PORT= 5000;
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/crudapp')
.then(()=>{
    console.log('mongodb connected successfully');
})
.catch(err => { 
    console.error(err);
});
//usermodel
const UserSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
   
}, {timestamps: true})
 const User = mongoose.model("User", UserSchema);
//create user API
app.post('/createuser', async (req, res)=>{
    try {
        const bodyData = req.body;
        const user= new User(bodyData)
         const userData = await user.save()
         res.send(userData)
        
    }catch (error) {
    res.send(error) 
    }
})
//read all users data
app.get('/readallusers', async (req,res)=>{
  try {
    const userData= await User.find({})
    res.send(userData)
    
  } catch (error) {
    res.send(error)
  }})
  //read single user data
app.get('/read/:id', async(req,res)=>{
    try {
        const id =req.params.id;
        const userData= await User.findById({_id:id});
        res.send(userData);
        
    } catch (error) {
        res.send(error)
        
    }
})
//update user
app.put('/updateuser/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const userData = await User.findByIdAndUpdate({_id:id}, req.body, {new:true})
        res.send(userData)
        
    } catch (error) {
        res.send(error)
    }
})
// delete User 
app.delete('/deleteuser/:id', async (req, res)=>{
   try {
    const id =req.params.id;
    const user= await User.findByIdAndDelete({_id: id});
    res.send(user)
    
   } catch (error) {
    res.send(error);
   }
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}) ;