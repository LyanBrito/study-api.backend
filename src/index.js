// requerimentos
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
// a aplicação não consegue ler a api em json sozinha, por isso chamamos express.json aqui



// a porta que irá rodar na maquina será a 3000
const port = 3000
const Film = mongoose.model('Film' ,{
  title: String,
  description: String,
  img_url: String,
  trailer_url: String

})


// .get usado para me retornar algo. listar algo
// req seria a requisição de algo
// res seria a resposta desse requisição
// .post usado para criar ou salvar um novo dado


// aqui estou dizendo para ele me retornar todos os filmes que tiver
app.get('/', async (req, res) => {
  const Films = await Film.find()
  res.send(Films)
})

// com .delete e .put devemos passar o id por parâmetro
// o id é criado com o metodo post, ao adicionar um novo Film no BD
app.delete('/:id', async(req, res) =>{
  const film = await Film.findByIdAndDelete(req.params.id)
  // .findById vai apenas retornar o array daquela id, porem não vai de fato deleta-lo. então usamons findByIdAndDelete
  res.send(film)
})

// aqui estou criando um novo "Film", e vou fazer uma requisição no body, pra trazer novos dados
// por ser uma operação asincrona, e devemos esperar o banco de dados retornar a função, adicionamos async e awayt

app.post('/', async (req, res) => {
  const newFilm = new Film({
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
    trailer_url: req.body.trailer_url,

  })
  await newFilm.save()
  res.send(newFilm)

})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://lyanbrito613:8g5SaOO3deqUrrk8@starwarsapi.udtwf.mongodb.net/?retryWrites=true&w=majority&appName=starwarsApi')
  console.log(`App runnin on port:${port}`)
})