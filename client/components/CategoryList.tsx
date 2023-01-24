import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../../common/Movie'
import * as api from '../apis/categories'

export default function CategoryList() {
  const [categories, setCategories] = useState(null as Category[] | null)
  useEffect(() => {
    const load = async () => {
      const data = await api.all()
      setCategories(data)
    }

    load()
  }, [])

  if (!categories) {
    return <p>Loading ...</p>
  }

  return (
    <div>
      <h2>All categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
