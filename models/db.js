const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/bookDirectory').then(()=>{
    console.log('Db Connected!...😂');
}).catch((err)=>{
    console.log(err);
})