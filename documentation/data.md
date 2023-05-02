[Back to Readme](/README.md)

### Data shapes / Interfaces

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

```js
  ImdbTrailer {
    imDbId: string
    title: string
    videoUrl: string
    videoId: string
  }
```

## Auth0 data
```js
  googleUser {
    email: string
    email_verified: boolean
    family_name: string
    given_name: string
    locale: string
    name: string
    nickname: string
    picture: string
    sub: string
    updated_at: string
    }

  newUser {
    email: string
    email_verified: boolean
    name: string
    nickname: string
    picture: string
    sub: string
    updated_at: string
  }
```