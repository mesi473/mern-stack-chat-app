const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const router=require('./routes/index')


const app=express();

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use('/',router);
const url="mongodb://localhost:27017/newChat"
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>console.log("our database is running on port 27017")).catch(error=>console.log(error))


app.listen(5000,()=>console.log("server is running  on port 5000"));