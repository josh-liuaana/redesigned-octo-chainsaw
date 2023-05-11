[Back to Readme](/README.md)

## Views/Components (Client Side)
  | name | purpose |
  | --- | --- |
  | App | Apps entry point/base component |
  | Authenticated | Component to identify if user is authenticated |
  | Details | Details of individual movie on the watchlist |
  | Home | Basic Homepage with links to search, watchlist auto displays |
  | Loading | Loading screen | 
  | Movies | Movies watchlist container |
  | Nav | Navbar component, incl login details |
  | Search | Form for searching the external imdp-api |
  | SearchInfo | Details of individual movie from imdb search |
  | SearchResult | View for individual movie tile for imdb-api search results |
  | SingleMovie | View for individual movie tile for watchlist movie |
  | Trailer | Movie trailer container |
  | User | Component with user information |

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

#### File name: users.ts
  | type | data | purpose |
  | --- | --- | --- |
  | SET_USER_IDS | Auth0_id[] | retrieve all user Auth0_ids |

---

## API (Client - Server)

#### Movies

| Method | API Function Name | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- | --- |
| Get | fetchMovies | /api/v1/movies | No | Get a list of movies from the DB | Array of Objects (object = Movie) |
| Delete | removeMovie | /api/v1/movies/:id | No | Delete a movie from the DB | id |
| Post | postMovie | /api/v1/movies | Yes | Add movie to database | Array of single object (object = Movie) |
| Patch | patchMovie | /api/v1/movies/:id | No | Update seen status of movie | status(200) |

#### Users

| Method | API Function Name | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- | --- |
| Get | fetchUserIds | /api/v1/users | No | Get a list of user Auth0_id | Array of Objects (object = Partial`<User>`) |
| Get | fetchSingleUser | /api/v1/users/:id | No | Get a single users user info | Promise User |
| Delete | removeUser | /api/v1/users/:id | No | Delete a single user from the user table | id |
| Post | postUser | /api/v1/users | No | Add a new user (with Auth0 info) | User |

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

#### Table name: users
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | name | String |
  | email | String |
  | given_name | String |
  | auth0_id | String |