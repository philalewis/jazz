const express = require('express');
const app = express();
app.use(express.json())
const jazzData = require('./data/data.js')
app.locals = { jazzData }

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jazz Musicians';

app.get('/api/v1/musicians', (request, response) => {
  const jazzData = app.locals.jazzData
  response.json({ jazzData })
});

app.get('/api/v1/musicians/:id', (request, response) => {
  const { id } = request.params
  const musician = app.locals.jazzData.find(musician => musician.id === id)
  !musician ? response.sendStatus(404) : response.status(200).json(musician)
})

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

// Test data:

// Miles Davis album:
// {
//   "title": "Jack Johnson",
//   "releaseYear": "1971",
//   "musicians": [
//       {"name": "Miles Davis", "instrument": "trumpet"},
//       {"name": "Steve Grossman", "instrument": "soprano saxophone"},
//       {"name": "John McLaughlin", "instrument": "electric guitar"},
//       {"name": "Herbie Hancock", "instrument": "organ"},
//       {"name": "Michael Henderson", "instrument": "electric bass"},
//       {"name": "Billy Cobham", "insturment": "drums"},
//       {"name": "Brock Peters", "instrument": "narration"}
//   ]
// }

// New musician (Wynton Kelley)
// {
//   name: 'Wynton Kelley',
//   instrument: 'piano',
// }
