import { Link } from 'react-router-dom'
import useCategories from '../hooks/useCategories'

export default function CategoryList() {
  const { pending, error, categories } = useCategories()

  if (pending) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>Error! {error}</p>
  }

  return (
    <div>
      <h2>All categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
