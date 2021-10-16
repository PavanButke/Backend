const express = require("express");

const fs= require("fs");

const path = require("path"); 

const app= express();

app.use(express.static("Frontend_folder"));
app.use(express.json());

let content = JSON.parse(fs.readFileSync("./data.json"))
// const userRouter = express.Router(); // express middleware
const authRouter = express.Router(); // express middleware

// app.use('/user' , userRouter);
app.use('/auth' , authRouter);



authRouter.route('/signup').post(bodyChecker , signupUser);







// userRouter.route('/').get(getUsers).post(bodyChecker , createUser);




// function createUser(req,res){
//   console.log("req.body", req.body);

//   let body = req.body;
//   console.log("req.body", req.body);
//   content.push(body);
//   fs.writeFileSync('./data.json', JSON.stringify(content));
//   res.json({message: content});

// }

function bodyChecker(req,res, next){
  let body = req.body;
  console.log("reached body checker");
  let isPresent = Object.keys(req,body).length;

  console.log("isPresent", isPresent);
  if(isPresent){
    next();
    }
    else{

      res.send("Kindly  send details in body");
    }
  }

 function signupUser(req, res) // signup ki process
 {
   let {name , email , password , confirmPassword}=req.body; // request 
  
   if(password == confirmPassword)
   {
     let newUser = {name , email , password};
     content.push();
     //saves data in data storage
     fs.writeFileSync("data.json", JSON.stringify(content));
     res.status(201).json({
        cratedUser : newUser 

     })
     
   }else{
        res.status(422).json({
            message: " Password and Confirm password do not match"

        })

   }

 }


// function getUsers(req, res) {
//     res.json({ message: content });
// }
//     app.listen(8081, function () {
//       console.log("server started");
//   })
  
 app.listen(8081 , function(){

    console.log("server started");

 })


  app.post("/", function(req , res , next){
    let body = req.body;
    console.log("inside first post", body);
    next();
  })
  app.use(function (req ,res , next){
    console.log("inside app.use");
    next();
  })

  app.get("/", function(req,res){

    let body = req.body;
    console.log("inside first get", body);
  })
  app.post("/" , function(req,res,next){
    let body = req.body;
    console.log('inside second post', body);
    res.send('tested next');
  })

  app.use(function (req, res){

      res.status(404).sendFile(path.jpin(__dirname , "404.html"));
  })

  
  
