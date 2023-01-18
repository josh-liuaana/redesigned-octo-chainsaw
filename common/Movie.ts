export interface Movie {
  id?: number
  title: string
  release_year: number
}

export interface MovieWithCategories extends Movie {
  categories: Category[]
}

export interface Category {
  id: number
  name: string
}
