JSON Movies Service
=======================

Movies in JSON database example. 

Remarks:
- run only one instance (no json file locking)
- todo: move json-db to separate repo
- todo: add more tests
- todo: add swagger-jsdoc
- todo: add posterUrl validation
- todo: move genres validation from validator to service

Api specs
---------

Following routes are available:

#### GET /

Returns service info.

Parameters:

none

Success response (http code 200):

```
{
    "status": "online",
    "name": "movies-json",
    "ip": "0.0.0.0",
    "port": 80,
    "upTime": 2
}
```


#### GET /movies

Returns list of movies.

Parameters:

| Param | From where | Type | Description |
|-------|------------|------|-------------|
| duration | query | int | optional, movies with runtime = <duraion - 10, duration + 10> |
| genres | query | arrya of strings | optional, movies with at least one genre from list, list will be sorted by matched genres count |

Success response (http code 200):

```
[
    {
        "id": 22,
        "title": "Inception",
        "year": 2010,
        "runtime": 148,
        "genres": [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],
        "director": "Christopher Nolan",
        "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
        "plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
    },
    {
        "id": 95,
        "title": "Pacific Rim",
        "year": 2013,
        "runtime": 131,
        "genres": [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],
        "director": "Guillermo del Toro",
        "actors": "Charlie Hunnam, Diego Klattenhoff, Idris Elba, Rinko Kikuchi",
        "plot": "As a war between humankind and monstrous sea creatures wages on, a former pilot and a trainee are paired up to drive a seemingly obsolete special weapon in a desperate effort to save the world from the apocalypse.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_SX300.jpg"
    }
]
```


#### POST /movies

Add new movies to database and returns it.

Parameters:

| Param | From where | Type | Description |
|-------|------------|------|-------------|
| title | body, json | string | required |
| year | body, json | int | required |
| runtime | body, json | int | required, in minutes |
| year | body, json | int | required |
| genres | body, json | array of valid genres | required |
| director | body, json | string | required |
| actors | body, json | string | optional |
| plot | body, json | string | optional |
| posterUrl | body, json | string | optional |

Success response (http code 200):

```
{
    "id": 147,
    "title": "Dune 2",
    "year": 2024,
    "runtime": 170,
    "genres": [
        "Sci-Fi"
    ],
    "director": "ktos tam2",
    "actors": "unknown",
    "plot": "",
    "posterUrl": ""
}
```
