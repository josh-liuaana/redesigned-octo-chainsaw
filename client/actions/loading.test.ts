import { describe, it, expect, vi } from "vitest";
import * as loadingActions from './loading'
import nock from 'nock'

describe('test environment working', () => {
  it('I think you will find this test suite is quite operational', () => {
    expect({ Josh: 'awesome' }).toBeTruthy()
  })
})

describe('loading action creators', () => {
  it('create the request action creator', () => {
    const { type, payload } = loadingActions.requestMovies()

    expect(type).toBe("REQUEST_MOVIES")
    expect(payload).toBeNull()

    expect(loadingActions.requestMovies()).toEqual({
      type: "REQUEST_MOVIES",
      payload: null
    })
  })

  it('creates the receive action creator', () => {
    const { type, payload } = loadingActions.receiveMovies()

    expect(type).toBe("RECEIVE_MOVIES")
    expect(payload).toBeNull()

    expect(loadingActions.receiveMovies()).toEqual({
      type: "RECEIVE_MOVIES",
      payload: null
    })
  })
})