import express from "express";
import usersRoute from "./routes/users.js";
import projectsRoute from "./routes/projects.js";
import bodyParser from "body-parser";
import  mongoose from "mongoose"
import  User from "./models/user.js";
import  cors from 'cors';
import jwt from "jsonwebtoken";
const secretKey="secret";
const app= express();
const PORT=5001;
''
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(bodyParser({limit: '50mb'}))
// app.use(bodyParser.json());
app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'name of your app',
            version: '0.1.0'
        }
    });

});
app.use("/users",usersRoute)
app.use("/projects",projectsRoute)

app.listen(process.env.PORT || PORT,()=>console.log(`server running on port:http://localhost:${PORT}`));
app.post("/SignIn",(req,res)=>{
    
    
    const email = req.body.email;
    const password = req.body.password;

const emp1= new User({
        
          email:email,
          password:password
   })
    jwt.sign({emp1},secretKey,{expiresIn:'1d'},(err,token)=>{
        res.json({
            token
        })
      })
  })
  app.post("/SignUp",verifyToken,(req,res)=>{
      jwt.verify(req.token,secretKey,(err,authData)=>{
          if(err){
              res.send({result: "invalid token"})
          }else{
              res.json({
                  message: "profile accessed",
                  authData
              })
          }
          
      })
  
  })
  function verifyToken(req,res,next){
      const bearerHeader = req.headers['authorization'];
      if(typeof bearerHeader !== 'undefined'){
         
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token=token;
      next();
      }else{
          res.send({
              result:'token is not valid'
          })
         
      }
  
  }


// mongoose.connect("mongodb://127.0.0.1:27017/ProjectManagement").then(()=>console.log("connected"))
//  .catch(e=>console.log(e));
 mongoose.connect("mongodb+srv://kenadamjoey93:jLCe8xvqyqNd8qB6@cluster0.xj98vp3.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("connected"))
.catch(e=>console.log(e));
// mongoose.connect("mongodb+srv://sowmyakv22:PFnq7nKyACyENGSh@cluster0.dhgiden.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("connected"))
// .catch(e=>console.log(e));
