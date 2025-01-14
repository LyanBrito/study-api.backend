// requerimentos
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// a aplicação não consegue ler a api em json sozinha, por isso chamamos express.json aqui
app.use(express.json());

const port = 3000;
const Film = mongoose.model("Film", {
	title: String,
	description: String,
	img_url: String,
	trailer_url: String,
});

// .get usado para me retornar algo. listar algo
// .post usado para adicionar ou salvar um novo dado
// .delete usado para deletar algo
// .put usado para atualizar algo

// .delete e .put devemos passar o id por parâmetro

// req -> requisição
// res -> resposta dessa requisição

// aqui estou dizendo para ele me retornar todos os filmes que tiver
// por ser uma operação asincrona, e devemos esperar o banco de dados retornar a função, adicionamos async e awayt
app.get("/", async (req, res) => {
	const Films = await Film.find();
	res.send(Films);
});

// aqui estou criando um novo "Film", e vou fazer uma requisição no body, pra trazer novos dados

app.post("/", async (req, res) => {
	const newFilm = new Film({
		title: req.body.title,
		description: req.body.description,
		img_url: req.body.img_url,
		trailer_url: req.body.trailer_url,
	});
	await newFilm.save();
	res.send(newFilm);
});

// o id é criado com o metodo post, ao adicionar um novo Film no BD
app.delete("/:id", async (req, res) => {
	const film = await Film.findByIdAndDelete(req.params.id);
	// .findById vai apenas retornar o array daquela id, porem não vai de fato deleta-lo. então usamons findByIdAndDelete
	res.send(film);
});

app.put("/id", async (req, res) => {
	const film = await Film.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
		description: req.body.description,
		img_url: req.body.img_url,
		trailer_url: req.body.trailer_url,
	}, {
    new: true
  });
  res.send(film)
});

app.listen(port, () => {
	mongoose.connect(
		"mongodb+srv://lyanbrito613:8g5SaOO3deqUrrk8@starwarsapi.udtwf.mongodb.net/?retryWrites=true&w=majority&appName=starwarsApi",
	);
	console.log(`App runnin on port:${port}`);
});
