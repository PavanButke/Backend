const mongoose = require('mongoose');
const db_link = 'mongodb+srv://pavanButke:BgFmMSuXAWj6tZq7@cluster0.eiqtb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(db_link).then(function(){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});