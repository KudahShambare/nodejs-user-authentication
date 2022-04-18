const express=require('express');//import the express library
const  bcrypt=require('bcrypt');//import the bycrypt library
const { json } = require('express/lib/response');

const app=express();//initializing express
app.use(express.json());//allow json user input

//users array
const users=[]

//create user
app.post("/user",async (req,resp)=>{
    try{
        const name=req.body.username
        const password=req.body.password
        const salt= await bcrypt.genSalt();
        const encryptedPassword=await bcrypt.hash(password,salt)
        users.push({username:name,
    password:encryptedPassword})
    resp.send('User created')
      
    }catch(e){
        resp.status(500).send("error ")
    }
 
})
//getuser
app.get("/user/login",async(req,resp)=>{
    try{
        const name=req.body.username
        const pass=req.body.password
        
        console.log(users);
       
        const thisUser=users.find((val)=>{
            return val.username=name
        })
        console.log(thisUser);
        
        if(thisUser==null){
            resp.send('user not found')
        }else{
            const compare=await bcrypt.compare(pass,thisUser.password)
          if(compare){
              resp.send('login was successful')
          }else{
              resp.send("Failed to login ")
          }
          
        }
       
    }catch(e){
        resp.status(500).send("error " + e)
    }
 
})

app.listen(3000,()=>{
    console.log('App listening to port 3000');
})
