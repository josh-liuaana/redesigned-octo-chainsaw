// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '../../test-utils'

describe('<Home />', () => {
  it('looks real good', () => {
    const { container } = mount()
    expect(container).toMatchSnapshot()
  })
})
