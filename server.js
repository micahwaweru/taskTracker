const express = require('express');

const fs = require('fs');
const path = require('path');
const PORT = 4001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json);
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});




app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});