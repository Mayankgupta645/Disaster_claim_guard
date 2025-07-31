const express=require('express');
const db=require('./database/db');
const imagerouter=require('./router/imagerouter');
const queryrouter=require('./router/queryrouter');
const bodypraser=require('body-parser');

const app=express();

app.use(bodypraser.json()); 
app.use(bodypraser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send("welcome to disaster-claim-guard");
});

app.use('/',imagerouter);
app.use('/',queryrouter);







app.listen(5000,()=>{
    console.log("server runing");
});