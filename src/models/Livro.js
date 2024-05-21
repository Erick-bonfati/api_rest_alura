import mongoose from "mongoose";
import { autorSchema } from './Autor.js';

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId},
  titulo: { type: String, required: true},
  editora: { type: String },
  preco: { type: Number},
  numeroPaginas: {type: Number},
  autor: autorSchema
}, { versionKey: false });


// aqui estamos passando a tabela que criamos no mongo e nossas priopriedades dos nossos livros
const livro = mongoose.model("livros", livroSchema); 

export default livro;