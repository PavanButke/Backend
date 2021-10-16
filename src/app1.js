const express = require("express");

const fs= require("fs");

const path = require("path"); 

const app= express();

app.use(express.static("Frontend_folder"));
app.use(express.json());

let content = JSON.parse(fs.readFileSync("./data.json"))
const userRouter = express.Router(); // express middleware
const authRouter = express.Router(); // express middleware

// app.use('/user' , userRouter);
app.use('/auth' , authRouter);



authRouter.route('/signup').post(bodyChecker , signupUser);







userRouter.route('/').get(protectRoute, getUsers)




// function createUser(req,res){
//   console.log("req.body", req.body);

//   let body = req.body;
//   console.log("req.body", req.body);
//   content.push(body);
//   fs.writeFileSync('./data.json', JSON.stringify(content));
//   res.json({message: content});

// }

authRouter.route("/signup")
    .post(bodyChecker, signupUser);
    authRouter.route("/login")
    .post(bodyChecker, loginUser);

    
    function getUsers(req,res)
    {
      res.status(200).json({
       ' message':content
      })
    }

    function protectRoute(req,res,next)
    {
      console.log("reached body checker");

      let isallowed= false;
      if(isallowed)
      {
          next();
      }else{
        res.send("kindly login to access this resource")
      }
    }


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
     //saves data in d ta storage
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

function loginUser(req, res) {
  let { email, password } = req.body;
  let obj = content.find((obj) => {
      return obj.email == email
  })
  if (!obj) {
      return res.status(404).json({
          message: "User not found"
      })
  }
  if (obj.password == password) {

      res.status(200).json({
          message: "user logged In",
          user: obj
      })
  } else {
      res.status(422).json({
          message: "password doesn't match"
      })
  }
}
  
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

      res.status(404).sendFile(path.join(__dirname , "Frontend_folder/404.html"));
  })

  
  
