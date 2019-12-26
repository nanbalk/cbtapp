const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cbtapp', {useNewUrlParser: true}, (err)=>{
    if(!err){
        console.log('\nConnected to CBTAPP database\n\n');
    }else{
        console.log('\n\nAn error occured while initialising connection  ',err,'\n\n');
    }
});
