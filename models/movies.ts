export interface Movie extends MovieData {
  id: number
}

export interface MovieData {
  title: string
  imdb_id: string
  watched: boolean
  img: string
}

export interface ImdbMovie {
  title: string
  description: string
  id: string
  image: string
  resultType: string
}

export interface Similars {
  id: string
  title: string
  image: string
  imDbRating: string
}

export interface ImdbDetails {
  id: string
  title: string
  image: string
  plot: string
  genres: string
  contentRating: string
  imDbRating: string
  metacriticRating: string
  similars: Similars[]
}

interface UpdatePayload {
  id: number
  seen: boolean
}

export type Action = 
  | { type: 'ERROR', payload: string }
  | { type: 'SET_MOVIES', payload: Movie[] }
  | { type: 'DEL_MOVIE', payload: number}
  | { type: 'ADD_MOVIE', payload: Movie}
  | { type: 'UPDATE_MOVIE', payload: UpdatePayload}
  | { type: 'ALPHA_SORT', payload: null}

export type ImdbAction = 
  | { type: 'IMDB_SEARCH', payload: ImdbMovie[]}
  | { type: 'IMDB_DETAILS', payload: ImdbDetails}

export type LoadingAction = 
  | { type: 'REQUEST_MOVIES', payload: null }
  | { type: 'RECEIVE_MOVIES', payload: null }