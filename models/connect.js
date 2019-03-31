//连接数据库
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/E-commerce',{useNewUrlParser: true}).then(
    (res) =>{
        console.log("Connected to Database Successfully !")
    }
    ).catch(
        ()=>{
            console.log("Conntection to database failed !")
        }
    );

var db = mongoose.connection;
