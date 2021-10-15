const express = require("express");

const fs= require("fs");

const path = require("path"); 

const app= express();


app.use(express.json());

let content = JSON.parse(fs.readFileSync("./data.json"))
const userRouter = express.Router(); // express middleware
const authRouter = express.Router(); // express middleware

app.use('/user' , userRouter);
app.use('/auth' , authRouter);

userRouter.route('/').get(getUsers).post(bodyChecker , createUser);

function createUser(req,res){
  console.log("req.body", req.body);

  let body = req.body;
  console.log("req.body", req.body);
  content.push(body);
  fs.writeFileSync('./data.json', JSON.stringify(content));
  res.json({message: content});

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

      res.send("Kind send details in body");
    }
  }


function getUsers(req, res) {
    res.json({ message: content });
}
    app.listen(8081, function () {
      console.log("server started");
  })
  
  // app.post("/", function(req , res , next){
  //   let body = req.body;
  //   console.log("inside first post", body);
  //   next();
  // })
  // app.use(function (req ,res , next){
  //   console.log("inside app.use");
  //   next();
  // })

  // app.get("/", function(req,res){

  //   let body = req.body;
  //   console.log("inside first get", body);
  // })
  // app.post("/" , function(req,res,next){
  //   let body = req.body;
  //   console.log('inside second post', body);
  //   res.send('tested next');
  // })
  
