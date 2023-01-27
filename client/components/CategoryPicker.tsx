import { ChangeEvent, useCallback } from 'react'
import useCategories from '../hooks/useCategories'

interface CategoryPickerProps {
  onChange: (categories: number[]) => void
  selected: number[]
}

function CategoryPicker({ onChange, selected }: CategoryPickerProps) {
  const onCheckboxChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = evt.currentTarget
      const id = Number(value)
      if (checked) {
        onChange([...selected, id].sort())
      } else {
        onChange(selected.filter((v) => v != id))
      }
    },
    [onChange, selected]
  )

  const { loading, error, categories } = useCategories()
  if (error) {
    return <>Failed to load categories</>
  }
  if (loading || !categories) {
    return <>Loading categories...</>
  }

  return (
    <label>
      <span>Category</span>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <label>
              <input
                type="checkbox"
                name={`category`}
                onChange={onCheckboxChange}
                checked={selected.includes(category.id)}
                value={category.id}
              />{' '}
              <span>{category.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </label>
  )
}

export default CategoryPicker
