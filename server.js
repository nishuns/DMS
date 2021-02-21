const express=require('express');
var cors = require('cors')
const app = express();
var http = require('http').createServer(app)
const bodyParser=require('body-parser');
require('dotenv');
const port = process.env.PORT || 4000
var waiting=null;


app.use(cors());

// mongoose.connect("mongodb+srv://UsersDB:mikkuo8279459923@cluster0.qcost.mongodb.net/UsersDB?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.set("useCreateIndex", true);

// const Chat= new mongoose.model('Chat', chatSchema);
// const Task=new mongoose.model('Task', taskSchema);
// const Feeds=new mongoose.model('Feeds', feedbackSchema);
// const Count=new mongoose.model('Count', countSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('./pages/index');
});

http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})