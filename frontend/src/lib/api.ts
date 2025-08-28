
import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE ?? ''

function mockDelay(data: any, ms = 300) { return new Promise(resolve => setTimeout(() => resolve(data), ms)) }

export async function fetchShapes() {
  if (!API_BASE) return mockDelay([
    { id: 'r100', type: 'rect', x: 60, y: 80, size: 90, fill: '#60a5fa' },
    { id: 'c100', type: 'circle', x: 220, y: 180, size: 50, fill: '#34d399' }
  ])
  const res = await axios.get(`${API_BASE}/shapes`)
  return res.data
}

export async function saveShapes(payload: any[]) {
  if (!API_BASE) return mockDelay({ ok: true })
  const res = await axios.post(`${API_BASE}/shapes`, payload)
  return res.data
}
