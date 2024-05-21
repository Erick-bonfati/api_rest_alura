import livro from "../models/Livro.js"
import { autor } from "../models/Autor.js"

class LivroController {

  static async listarLivros (req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch(erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    }
  }

  static async listarLivroPorId (req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch(erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição do livro` });
    }
  }

  static async cadastrarLivro (req, res) {
    const novoLivro = req.body; // pegando os dados do livro que estamos criando

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor) // buscando o autor pelo id do livro

      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }} // buscando os dados do autor e adicionando no livro

      const livroCriado = await livro.create(livroCompleto) // Criando o novo livro com as informações do autor
      res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });

    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body); // procura pelo id, e depois atualiza de acorda com o req.body
      res.status(200).json({message: "Livro atualizado!"});
    } catch(erro) {
      res.status(500).json({ message: `${erro.message} - Falha na atualização` });
    }
  }

  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id); // procura pelo id, e depois atualiza de acorda com o req.body
      res.status(200).json({message: "Livro excluido com sucesso!"});
    } catch(erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao excluir livro` });
    }
  }

  static async listarLivrosPorEditora (req, res) {
    const editora = req.query.editora; // buscando informações usando query, ex: :3000/SEARCH?editora=nomeEditora
    try {
      const livrosPorEditora = await livro.find({ editora: editora}) // Buscando livro pela editora, que vai chegar via rota
      res.status(200).json(livrosPorEditora);
    } catch(erro) {
      res.status(500).json({ message: `${erro.message} - Falha na busca` });
    }
  }
}

export default LivroController;