export interface MovieData {
  id: number
}

export interface Movie extends MovieData{
  title: string
  imdb_id: string
  watched: boolean
  img: string
}

export type Action = 
  | { type: 'SET_MOVIES', payload: Movie[] }
  | { type: 'ERROR', payload: string}