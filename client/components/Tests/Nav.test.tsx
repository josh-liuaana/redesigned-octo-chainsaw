// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from '../Nav'

describe('test setup working', () => {
  it('weow, she works', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('<Nav />', () => {
  it('Movies title is there', () => {
    render(<Nav />)
    // screen.debug()
    const title = screen.getByText('Mooo-vies 2.0')
    expect(title.textContent).toBe('Mooo-vies 2.0')

    const heading = screen.getByRole('heading')
    expect(heading.textContent).toBe('Mooo-vies 2.0')
  })
})