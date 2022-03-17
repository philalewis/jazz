# Jazz API

This repository was created by Phil Lewis as part of the Front End Engineering program at Turing School of Software and Design

This server was written in Express for use with the [Jazz Collaborations](https://github.com/philalewis/jazz-collaborations) project.

### API Endpoints
| Purpose | URL | Verb | Request Body | Successful Response |
| --- | --- | --- | --- | --- |
| Base URL | `https://jazz-collaborations-api.herokuapp.com/` | n/a | n/a | n/a |
| Get all featured musicians | `/api/v1/musicians` | GET | n/a | `{names: [{name: 'Miles Davis', id: '1'}, ...]}` |
| Get a single musician | `/api/v1/musicians/:id` | GET | n/a | `{name: 'Miles Davis, id: '1', instrument: 'Trumpet', photo: '', albums: []}` |
| Get a single album | `/api/v1/album/:id` | GET | n/a | `{id: 201, albumArtist: 'John Coltrane', title: 'Blue Train', releaseYear: 1958, cover: '', musicians: []}`
| Get a list of all albums a musician performed on | `/api/v1/appearances/:name` | GET | n/a | `[{id: 201, ...}, ...]`
| Add a new musician to featured musicians | `/api/v1/musicians` | POST | `{name: 'string', instrument: 'string'}` | `{ id: '', name: '', instrument: '', albums: []}`
| Add a new album to an artists' collection | `/api/v1/musicians/:id` | POST | `{title: 'string', releaseYear: 'number', musicians: 'array'}` | `{title: 'string', releaseYear: 'number', musicians: 'array'}` |
