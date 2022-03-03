const express = require('express');
const app = express();
app.use(express.json())
const jazzData = require('./data/data.js')
app.locals = { jazzData }
const cors = require('cors');

app.use(cors());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jazz Musicians';

// GETS
app.get('/api/v1/musicians', (request, response) => {
  const jazzData = app.locals.jazzData
  const names = app.locals.jazzData.map(musician => {
    return {name: musician.name, id: musician.id}
  })
  response.json({ names })
});

app.get('/api/v1/musicians/:id', (request, response) => {
  const { id } = request.params
  const musician = app.locals.jazzData.find(musician => musician.id === id)
  !musician ? response.sendStatus(404) : response.status(200).json(musician)
})

app.get('/api/v1/album/:id', (request, response) => {
  const { id } = request.params
  let artistAlbum = null
  app.locals.jazzData.forEach(musician => {
    musician.albums.forEach(album => {
      album.id === parseInt(id) ? artistAlbum = album : null
    })
  })
  !artistAlbum ? response.sendStatus(404) : response.status(200).json(artistAlbum)
})

// POSTS
app.post('/api/v1/musicians', (request, response) => {
  const id = Date.now()
  const musician = request.body
  for (let requiredParameter of ['name', 'instrument']) {
    !musician[requiredParameter] ?
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, instrument: <String> }. You are missing a "${requiredParameter}" property.` }) : null
  }

  const albums = [];
  const { name, instrument } = musician
  app.locals.jazzData.push({ id, name, instrument, albums });
  response.status(201).json({ id, name, instrument, albums });
})

app.post('/api/v1/musicians/:id', (request, response) => {
  const album = request.body
  for (let requiredParameter of ['title', 'releaseYear', 'musicians']) {
    !album[requiredParameter] ?
      response.status(422).send({
        error: `Expected format: { title: <String>, releaseYear: <String>, musicians: <Array> }. You are missing a "${requiredParameter}" property.`
      }) : null
  }
  const { id } = request.params
  const { title, releaseYear, musicians } = album
  const musician = app.locals.jazzData.find(player => player.id === id)
  musician.albums.push({ title, releaseYear, musicians });
  response.status(201).json({ title, releaseYear, musicians })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
