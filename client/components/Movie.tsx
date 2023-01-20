import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Movie as MovieData } from '../../common/Movie'
import * as api from '../apis/movies'

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState<MovieData | null>(null)
  
  useEffect(() => {
    async function fetchData() {
      const data = await api.byId(Number(id))
      setMovie(data)
    }

    fetchData()
  }, [id])

  return <p>Movie: {movie && JSON.stringify(movie)}</p>
}
