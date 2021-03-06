const express=require('express');
const app=express();

app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());

// app.use((req,res,next)=>{
//     //do some work
//     console.log('i am a middleware');
//     next();
// });

app.use(express.static('public'));
const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user' , userRouter);
app.use('/auth/' , authRouter);
//mounting in express

userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

// app.use((req,res,next)=>{
//     //do some work
//     console.log('i am a middleware 2nd time');
//     next();
// });

userRouter
.route('/:id')
.get(getUserById);  

authRouter
.route('/signup')
.post(signupUser);

authRouter
.route('/forgotPassword')
.get(getForgetPassword)
.post(postForgetPassword , validateEmail);

function getForgetPassword(req , res)
{
    res.sendFile('/public/forgetPassword.html',{root:__dirname});
}

function postForgetPassword(req,res,next)
{
    let data = req.body;
    console.log('data',data);
    next();
}

function validateEmail(req,res)
{
    console.log('in validateEmail function');
    console.log(req.body);
    
    res.json({
        message:"data received",
        data:req.body
    });
}

//redirect

app.get('/user-all',(req,res)=>{
    res.redirect('/user');
});

//404 page

app.use((req,res)=>{
    res.sendFile('public/404.html', {root: __dirname})
});



function signupUser(req,res)
{
     // let userDetails=req.body;
    // let name=userDetails.name;
    // let email=userDetails.email; => destructering this to
    
   let   {email,name,password}= req.body;
    // user.push({email,name,password});
    console.log('user',req.body);
    res.json({
        message:'user signedUp',
        user:req.body
    });
}

let user=[];
// client <- server
//crud- create read update delete
//read
// app.get('/',(req,res)=>{
//     res.send('Home Page');
// });
function getUser(req,res){
{
    console.log('getUser called');
    res.json(user);   
}
}

//post request
// client-> server 
//create
// app.post('/user',(req,res)=>{
function createUser(req,res){    
        user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
};
//update
// app.patch('/user',(req,res)=>{
    function updateUser(req,res){

    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
}

//delete 
function deleteUser(req,res){
    user={};
    res.json(user);
    // res.send('ussr has been deleted');
};
//param route
// app.get('/user/:id',(req,res)=>{
    function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
};
