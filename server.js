const express = require('express');


const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const PORT = 4001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.get('/viewTasks',(req,res)=>{
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData=JSON.parse(data);
        console.log(dbData);
        res.send(dbData);
    });
});

app.post('/addTask',(req,res)=>{
    const newTask = req.body;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData=JSON.parse(data);
        dbData.push(newTask)
        let number = 1;
            dbData.forEach((task,i)=>{
                task.id = number;
                number++
                return dbData;
            });
        stringData=JSON.stringify(dbData);
        fs.writeFile('db.json',stringData,(err,data)=>{
            if(err)throw err;
        });
    });
    res.send('Create Route')
});

app.delete('/deleteTask/:id',(req,res)=>{
    var taskId=req.params.id;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData=JSON.parse(data);
        for(let i=0;i<dbData.length;i++){
            if(dbData[i].id===Number(taskId)){
                dbData.splice([i],1);
            }
        }
        stringData=JSON.stringify(dbData);
        fs.writeFile('db.json',stringData,(err)=>{
            if(err)throw err;
        });
    });
    res.send(`Task number ${taskId} deleted`)
})










app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});