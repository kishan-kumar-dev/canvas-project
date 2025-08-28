
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import App from '../App'

describe('App basic tests', () => {
  it('renders tabs and toggles', () => {
    render(<App />)
    const canvasTab = screen.getByRole('button', { name: /Canvas Editor/i })
    const flowTab = screen.getByRole('button', { name: /Flow Editor/i })
    expect(canvasTab).toBeInTheDocument()
    expect(flowTab).toBeInTheDocument()
    fireEvent.click(flowTab)
    expect(flowTab).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(canvasTab)
    expect(canvasTab).toHaveAttribute('aria-pressed', 'true')
  })

  it('mock API load/save updates status', async () => {
    render(<App />)
    const loadBtn = screen.getByRole('button', { name: /Load \(Mock API\)/i })
    const saveBtn = screen.getByRole('button', { name: /Save \(Mock API\)/i })
    fireEvent.click(loadBtn)
    expect(await screen.findByText(/Loaded shapes from API/)).toBeInTheDocument()
    fireEvent.click(saveBtn)
    expect(await screen.findByText(/Saved to API/)).toBeInTheDocument()
  })
})
