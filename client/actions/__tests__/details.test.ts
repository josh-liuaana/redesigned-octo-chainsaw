import * as actions from '../details'
import nock from 'nock'

import { addCategory, deleteCategory } from '../details'

describe('addCategory', () => {
  it("doesn't update if no movie is loaded", async () => {
    nock.disableNetConnect()
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return { details: { data: null, pending: true, error: undefined } } as any
    })

    addCategory({ id: 2, name: 'Drama' })(dispatch, getState)
    expect(dispatch).not.toHaveBeenCalledWith(actions.pending())
    expect(dispatch).not.toHaveBeenCalledWith(
      actions.failed(expect.any(String))
    )
    expect(dispatch).not.toHaveBeenCalledWith(
      actions.received(expect.any(Object))
    )
  })
})

describe('deleteCategory', () => {
  it("doesn't update if no movie is loaded", async () => {
    nock.disableNetConnect()
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return { details: { data: null, pending: true, error: undefined } } as any
    })

    deleteCategory(1)(dispatch, getState)
    expect(dispatch).not.toHaveBeenCalledWith(actions.pending())
    expect(dispatch).not.toHaveBeenCalledWith(
      actions.failed(expect.any(String))
    )
    expect(dispatch).not.toHaveBeenCalledWith(
      actions.received(expect.any(Object))
    )
  })
})
