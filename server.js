const express=require('express');
var cors = require('cors')
const app = express();
var http = require('http').createServer(app)
const bodyParser=require('body-parser');
const { Client }=require('pg');
require('dotenv').config();
const port = process.env.PORT || 4000
var waiting=null;


app.use(cors());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));



// get request for login page
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/source/index.html');
})

app.get('/getspreasheets', (req,res)=>{
  client.query('SELECT * FROM students', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send({
      status: "success",
      message: "Successfully added data",
      spreadsheets: results.rows 
    })
  });
})

app.post('/savespreadsheet', (req,res)=>{
  let spreadsheet=req.body.spreadsheet;
  console.log(spreadsheet);
  for(let sheet of spreadsheet){
    client.query(`INSERT INTO ${req.body.table}(name, roll_no, class) VALUES($1, $2, $3)`,[sheet.Name, sheet.Roll_no, sheet.Class], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results);
    })
  }
  client.query('SELECT * FROM students', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send({
      status: "success",
      message: "Successfully added data",
      spreadsheets: results.rows 
    })
  });
});

app.post('/delrow', (req,res)=>{ 
  let id=req.body.id;
  client.query(`DELETE FROM students WHERE id=${id}`, (error, result) => {
    if (error) {
      throw error
    }
    console.log(result);
    client.query('SELECT * FROM students', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send({
        status: "success",
        message: "Successfully deleted data",
        spreadsheets: results.rows 
      })
    });
  });
});

app.get('/test', (req,res)=>{
  client.query('INSERT INTO students(name, roll_no, class) VALUES($1, $2, $3)',["Nischay", 17, 7], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
  })
})

app.get('/testme', (req,res)=>{
  client.query('SELECT * FROM students', (error, results) => {
    if (error) {
      throw error
    }
    console.log((results.rows));
    res.status(200).json(results.rows)
  })
})

http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})