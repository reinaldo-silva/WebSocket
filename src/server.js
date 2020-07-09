const express = require("express");
const path = require("path");
const erroController = require("./controller/errorController");
const bodyParser = require("body-parser");

const Erro = require('./model/error');

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
express.urlencoded({extended: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/show", erroController.index);
app.post("/create", erroController.create);

app.use('/', async (req, res) => {
  res.render('index.html');
});

 let erros = Erro.map();
//.on escuta e o emit manda a mensagem
io.on("connection", async (socket) => {

  //. on escuta uma conexão
  console.log(`Socket conectado: ${socket.id}`); //toda vez que algum socket for conectado vai haver uma mensagem avisando

  console.log(erros);
  socket.emit("previousMessages", erros); //manda todas as mensagens que ja estao armazenas para o front caso seja atualizado a pagina

   socket.on("sendMessage", async (data) => {
    //receber a mensagem do front
    Erro.create(data);
    socket.broadcast.emit("recivedMessage", data); // o broadcast manda a mensagem para todos od sockets conectados
  }); 
});

server.listen(3001);
