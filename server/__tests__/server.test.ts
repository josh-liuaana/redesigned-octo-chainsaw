/** @jest-environment node */
import request from 'supertest'
import server from '../server'

/**
 * This is not necessarily a test I'm usually keen to write, but
 * I'm just picking up easy coverage here and there
 */
describe('server wildcard rule', () => {
  it('serves index.html', async () => {
    const res = await request(server).get('/movies')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/text\/html/)
    expect(res.text).toMatchSnapshot()
  })
})
