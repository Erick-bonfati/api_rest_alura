import express from "express";
import conectaNaDataBase from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => { // aqui vai ser a primeira verificação se a conexão com o banco funcionou
  console.error("Erro de conexão", erro);
})

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso")
})

const app = express();
routes(app); //importando as rotas do nosso index.js / routes


export default app;