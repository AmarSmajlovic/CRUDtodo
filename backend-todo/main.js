const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const conn = require('./connection');
const { res,req, response } = require('express');

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));


//pozivanje svih todo sa baze podataka

app.get('/all-todos',(req,res) => {
    conn.query('SELECT * FROM todo_list',(err,results) => {
        if(err) throw err;
        res.json(results);
    })
})


//pozivanje jednog todo by id

app.get('/get-todo/:id',(req,res) => {
    let sql = 'SELECT * FROM todo_list WHERE ID = ?';
    let id = req.params.id;
    conn.query(sql,[id],(err,result) => {
        if(err) throw err;
        res.json(result);
    })
})

//dodavanje todo-a

app.get('/add-todo/:title',(req,res) => {
 let sql = 'INSERT todo_list (title) VALUES(?)';
 let title = req.params.title;
 conn.query(sql,[title],(err,result) => {
     if(err) throw err;
     res.json(result);
 })
});


//brisanje todo-a

app.delete('/delete-todo/:id',(req,res) => {
    let sql = 'DELETE FROM todo_list WHERE ID = ?';
    let id = req.params.id;
    conn.query(sql,[id],(err,result) => {
        if(err) throw err;
        res.json(result);
    })
})

//editovanje todo-a

app.get('/update-todo/:id/:title',(req,res) => {
    let sql = `UPDATE todo_list  SET title  = ('${req.params.title}') WHERE ID = ${req.params.id}`;
    conn.query(sql,(err,result) => {
        if(err) throw err;
        res.json(result);
    })
})

app.listen(PORT,() => {
    console.log(`Application is started on port ${PORT}`);
})

