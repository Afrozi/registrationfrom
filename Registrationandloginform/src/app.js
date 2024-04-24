const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const bcrypt = require("bcrypt");
require('./db/connect');
const playlistschema = require("./model/model");
const staticpath = path.join(__dirname,'../template/views');
app.set("views",staticpath);
app.set("view engine","hbs");
app.use(express.urlencoded({extended:false}));
app.get("/",(rq,res)=>{
    res.render("sign");
});

app.post("/empdata",async(req,res)=>{
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
         const postdata = new playlistschema({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword,
         });
         const getdata = await postdata.save();
         res.render('login');
    }else{
        res.send("password are not matching...");
    }
})

// app.post("/logindata", async (req,res)=>{
//     const password = req.body.password;
//     const email = req.body.email;
//     const findData = await playlistschema.findOne({email:email});
//     const realdata = await bcrypt.compare(password,findData.password);
//     // if (findData.password === password) {
//     if (realdata) {
//          res.render('sign');
//     }else{
//         res.send("password are not matching....");
//     }
// });

// app.get("/login",(rq,res)=>{
//     res.render("login");
// });

app.listen(port,()=>{
    console.log('connected');
});