
## Views/Components (Client Side)
  | name | purpose |
  | --- | --- |
  | Home | Basic Homepage with links to search, watchlist auto displays |
  | Movies | Movies watchlist container |
  | SingleMovie | View for individual movie tile for watchlist movie |
  | Search | Form for searching the external imdp-api |
  | SearchResult | View for individual movie tile for imdb-api search results |

## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | moviesReducer | Store the array of movies from the db |
  | imdbReducer | Store the array of movies from the imdb-api |

## Actions (Client Side)
#### File name: movies.ts

  | type | data | purpose |
  | --- | --- | --- |
  | SET_MOVIES | Movies[] | For retrieving the movies from the server response |
  | DEL_MOVIE | id | For deleting a movie from the watchlist, db and the store |
  | ERROR | message | For error handling, sends error message |

#### File name: imdb.ts
  | type | data | purpose |
  | --- | --- | --- |
  | IMDB_SEARCH | ImdbMovie[] | Accesses the external API updates store with array of search results | 


## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/v1/movies | No | Get a list of movies from the DB | Array of Objects (object = Movie) |
| Delete | /api/v1/movies/:id | No | Delete a movie from the DB | id |
| Post | /api/v1/movies | No | Add movie to database | Array of single object (object = Movie) |



## Database (Server)

#### Table name: movies
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | title | String |
  | imdb_id | String |
  | watched | Boolean |
  | img | String |