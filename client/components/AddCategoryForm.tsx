import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Category } from '../../common/Movie'
import * as CategoryApi from '../apis/categories'

interface Props {
  categories?: Category[]
  onSubmit: (category: Category) => void
}

function AddCategoryForm({ categories: existingCategories, onSubmit }: Props) {
  const [category, setCategory] = useState(null as Category | null)

  const [categories, setCategories] = useState([] as Category[])

  useEffect(() => {
    async function fetchData() {
      const data = await CategoryApi.all()
      setCategories(data)
    }

    fetchData()
  }, [])

  if (!categories) {
    return <></>
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (category != null) {
      onSubmit(category)
    }
  }

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.currentTarget
    const id = Number(value)
    if (isNaN(id)) {
      setCategory(null)
      return
    }

    const category = categories.find((c) => c.id === id)
    if (category != null) {
      setCategory(category)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>New category</span>
        <select onChange={handleChange}>
          <option>Choose a category</option>
          {categories
            .filter(
              // remove any categories that this movie is already in
              (cat) =>
                existingCategories &&
                !existingCategories?.some((existing) => existing.id == cat.id)
            )
            .map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddCategoryForm
