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

export type Action = 
  | { type: 'ERROR', payload: string }
  | { type: 'SET_MOVIES', payload: Movie[] }
  | { type: 'DEL_MOVIE', payload: number}
  | { type: 'ADD_MOVIE', payload: Movie}
  | { type: 'ALPHA_SORT', payload: null}

export type ImdbAction = 
  | { type: 'IMDB_SEARCH', payload: ImdbMovie[]}