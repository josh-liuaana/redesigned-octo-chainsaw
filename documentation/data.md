### Data shapes / Interface

```js
  Movie {
    id: number
    title: string
    imdb_id: string
    watched: boolean
    img: string
  }
```

```js
  ImdbMovie {
    title: string
    description: string
    id: string
    image: string
    resultType: string
  }
```

```js
  ImdbDetails {
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
```