# Jazz API

This repository was created by Phil Lewis as part of the Front End Engineering program at Turing School of Software and Design

This server was written in Express for use with the [Jazz Collaborations](https://github.com/philalewis/jazz-collaborations) project.

### API Endpoints
| Purpose | URL | Verb |
| --- | --- | --- |
| Base URL | `https://jazz-collaborations-api.herokuapp.com/` | n/a |
| Get all featured musicians | `/api/v1/musicians` | GET |
| Get a single musician | `/api/v1/musicians/:id` | GET |
| Get a single album | `/api/v1/album/:id` | GET |
| Get a list of all albums a musician performed on | `/api/v1/appearances/:name` | GET |
