[Back to Readme](/README.md)

# Features

## Deployment
- Get movites on the line

---

## Testing
- Implement vitest
- Test the full stack
  - Create the front and back end testing suites
  <details style="padding-top: 0.5em">
    <summary>Notes</summary>
    <p style="padding-top: 0.5em">Currently the server side testing is working as it should, as are most of the client side tests. The component tests are still unfinished</p>
  </details>

---

## CSS frameworks
Create different branches with a different framework implemented
- Semantic UI
- Material UI
- SCSS
- Tailwind

---

## Auth
- Auth0 integration
  - Protected individual watchlists
  <details style="padding-top: 0.5em">
  <summary>Notes</summary>
  <p style="padding-top: 0.5em">Post route now passes with auth id, and succesfully inserts into the db</p>
  <p>Next steps include providing protection to all routes so that only logged in users can add movies to their watchlists, and the correct user can access and alter their own data (GET, DELETE, UPDATE)</p>
  </details>

---

## DB's
- Avoid duplicate movies being adding
- Second Database
  - User DB to link watchlists to users

## Watchlist comparison
- Compate the watchlists of two users and find common movies

---

## Streaming
- Which streaming services have the movie available
- Links to those sites

---

## TV shows
- Similar functionality as the movies
- Either an entirely different route, or the same page but with different coloured cards or something
