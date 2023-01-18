import { Movie } from '../../common/Movie'

export const all = async (): Promise<Movie[]> => {
  const res = await fetch('/api/v1/movies')
  const data = await res.json()
  return data
}
