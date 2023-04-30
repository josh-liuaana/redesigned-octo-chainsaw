[Back to Readme](/README.md)

## Views/Components (Client Side)
  | name | purpose |
  | --- | --- |
  | App | Apps entry point/base component |
  | Home | Basic Homepage with links to search, watchlist auto displays |
  | Movies | Movies watchlist container |
  | SingleMovie | View for individual movie tile for watchlist movie |
  | Details | Details of individual movie on the watchlist |
  | Search | Form for searching the external imdp-api |
  | SearchInfo | Details of individual movie from imdb search |
  | SearchResult | View for individual movie tile for imdb-api search results |
  | Trailer | Movie trailer container |
  | Loading | Loading screen | 

  ---

## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | movies | Store the array of movies from the db |
  | imdb | Store the array of movies from the imdb-api |
  | details | Store an object of individual movie data |
  | trailer | Store an object with individual movie trailer data |
  | loading | Request and Receive movie |

  ---

## Actions (Client Side)
#### File name: movies.ts

  | type | data | purpose |
  | --- | --- | --- |
  | SET_MOVIES | Movie[] | For retrieving the movies from the server response |
  | DEL_MOVIE | id | For deleting a movie from the watchlist, db and the store |
  | ADD_MOVIE | Movie | Adding a movie to the database |
  | UPDATE_MOVIE | id | Updating the seen status of a db movie |
  | ERROR | message | For error handling, sends error message |
  | ALPHA_SORT | null | sort movieList alphabetically |
  | DATE_SORT | null | sort movieList be date added to db |


#### File name: imdb.ts
  | type | data | purpose |
  | --- | --- | --- |
  | IMDB_SEARCH | ImdbMovie[] | Accesses the external API updates store with array of search results | 
  | IMDB_DETAILS | ImdbDetails | Accesses external db with object of movie details |
  | IMDB_TRAILER | ImdbTrailer | Accesses external db with object pf movie trailer data |
  | ERROR | message | For error handling, sends error message |

#### File name: loading.ts
  | type | data | purpose |
  | --- | --- | --- |
  | REQUEST_MOVIES | boolean | When the external api search run triggers to loading screen |
  | RECEIVE_MOVIES | boolean | Stops the loading screen and renders the movie data |

---

## API (Client - Server)

| Method | API Function Name | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- | --- |
| Get | fetchMovies | /api/v1/movies | No | Get a list of movies from the DB | Array of Objects (object = Movie) |
| Delete | removeMovie | /api/v1/movies/:id | No | Delete a movie from the DB | id |
| Post | postMovie | /api/v1/movies | No | Add movie to database | Array of single object (object = Movie) |
| Patch | patchMovie | /api/v1/movies/:id | No | Update seen status of movie | status(200) |

---

## External API

| Method | Function Name | Endpoint | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | searchImdb | https://imdb-api.com/en/API/SearchMovie | Search imdb movie database for list of movies | ImdbMovie[] |
| Get | movieInfo | https://imdb-api.com/en/API/Title | Search imdb for individual movie information | ImdbDetails |
| Get | getTrailer | https://imdb-api.com/en/API/YouTubeTrailer | Search imdb to get the youtube trailer for a given movie | ImdbTrailer |

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
  | date_added | Number |
  | added_by_user (auth0Id) | String | 
