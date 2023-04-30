import { describe, it, expect } from "vitest";

import loadingReducer from "./loading";
import * as loadingActions from '../actions/loading'

describe('test env working', () => {
  it('ITS WOOOOOORKING', () => {
    expect('its over 900').toBeTypeOf('string')
    expect(1+1).toBe(4-2)
    expect(String(Math.random())).not.toBeNaN()
  })
})

describe('Loading reducer', () => {
  it('sets loading state when requested', () => {
    const state = loadingReducer(false, loadingActions.requestMovies())
    
    expect(state).toBeTypeOf('boolean')
    expect(state).toBe(true)
    expect(state).toBeTruthy()
    expect(String(state)).toBe('true')
  })

  it('sets received state when movies been got', () => {
    const state = loadingReducer(true, loadingActions.receiveMovies())

    expect(state).toBeTypeOf('boolean')
    expect(state).not.toBe(true)
    expect(state).not.toBeTruthy()
    expect(String(state)).not.toBe('true')
  })
})