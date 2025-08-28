
import React, { useMemo, useState } from 'react'
import CanvasEditor from './components/CanvasEditor'
import FlowEditor from './components/FlowEditor'
import { fetchShapes, saveShapes } from './lib/api'

type Tab = 'canvas' | 'flow'

export default function App() {
  const [tab, setTab] = useState<Tab>('canvas')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>('')

  const tabs: Array<{ key: Tab; label: string }> = useMemo(
    () => [
      { key: 'canvas', label: 'Canvas Editor' },
      { key: 'flow', label: 'Flow Editor' }
    ],
    []
  )

  async function handleLoadFromAPI() {
    setLoading(true); setStatus('Loading from API...')
    try {
      const data = await fetchShapes()
      localStorage.setItem('shapes', JSON.stringify(data))
      setStatus('Loaded shapes from API (mock or backend).')
    } catch (err) {
      setStatus('Failed to load shapes (mock API).')
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveToAPI() {
    setLoading(true); setStatus('Saving to API...')
    try {
      const shapes = JSON.parse(localStorage.getItem('shapes') ?? '[]')
      await saveShapes(shapes)
      setStatus('Saved to API (mock or backend).')
    } catch {
      setStatus('Failed to save (mock API).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Canvas Frontend Starter</h1>
          <div className="flex gap-2">
            <button onClick={handleLoadFromAPI} disabled={loading} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 text-sm">Load (Mock API)</button>
            <button onClick={handleSaveToAPI} disabled={loading} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 text-sm">Save (Mock API)</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto w-full px-4 py-3">
        <nav className="flex gap-2 mb-3">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-3 py-2 rounded-xl border text-sm ${tab === t.key ? 'bg-white' : 'bg-gray-100 hover:bg-gray-200'}`} aria-pressed={tab === t.key}>
              {t.label}
            </button>
          ))}
        </nav>

        <section className="w-full">
          {tab === 'canvas' ? <CanvasEditor /> : <FlowEditor />}
        </section>

        <p className="mt-4 text-xs text-gray-600" role="status">{status}</p>
      </div>

      <footer className="mt-auto bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-500">
          Fully responsive layout • Keyboard help: Delete to remove, drag to move, scroll to zoom
        </div>
      </footer>
    </div>
  )
}
