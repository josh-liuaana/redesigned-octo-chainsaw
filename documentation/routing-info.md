
## Views/Components (Client Side)
  | name | purpose |
  | --- | --- |
  | Home | Basic Homepage with links to search, watchlist auto displays |
  | Movies | Movies watchlist container |
  | SingleMovie | View for individual movie tile for watchlist movie |
  | Search | Form for searching the external imdp-api |
  | SearchInfo | Details of individual movie |
  | SearchResult | View for individual movie tile for imdb-api search results |
  | Loading | Loading screen | 

  ---

## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | moviesReducer | Store the array of movies from the db |
  | imdbReducer | Store the array of movies from the imdb-api |
  | detailsReducer | Store an object of individual movie data |
  | loading | Request and Receive movie, null payloads - no info going to or from the store |

  ---

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
  | IMDB_DETAILS | ImdbDetails | Accesses external db with object of movie details |

#### File name: loading.ts
  | type | data | purpose |
  | --- | --- | --- |
  | REQUEST_MOVIES | boolean | When the external api search run triggers to loading screen |
  | RECEIVE_MOVIES | boolean | Stops the loading screen and renders the movie data |

---

## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/v1/movies | No | Get a list of movies from the DB | Array of Objects (object = Movie) |
| Delete | /api/v1/movies/:id | No | Delete a movie from the DB | id |
| Post | /api/v1/movies | No | Add movie to database | Array of single object (object = Movie) |
| Patch | /api/v1/movies/:id | No | Update seen status of movie | status(200) |

---

## Database (Server)

#### Table name: movies
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | title | String |
  | imdb_id | String |
  | watched | Boolean |
  | img | String |
  | data_added | Timestamp |

Update table migration with timestamp  
Something like:
```js
  table.timestamp('date_added').defaultTo(knex.fn.now())
```