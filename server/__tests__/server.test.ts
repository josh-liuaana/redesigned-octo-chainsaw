// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { default as request } from 'supertest'

/**
 * This is not necessarily a test I'm usually keen to write, but
 * I'm just picking up easy coverage here and there
 */
describe('server wildcard rule', () => {
  it('serves index.html', async () => {
    process.env.NODE_ENV = 'production'
    const { default: server } = await import('../server')
    const res = await request(server).get('/movies')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/text\/html/)
    expect(res.text).toMatchSnapshot()
  })
})
