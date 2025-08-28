
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

let shapes = [
  { id: 'r100', type: 'rect', x: 60, y: 80, size: 90, fill: '#60a5fa' },
  { id: 'c100', type: 'circle', x: 220, y: 180, size: 50, fill: '#34d399' }
]

app.get('/shapes', (req, res) => res.json(shapes))
app.post('/shapes', (req, res) => { shapes = req.body || shapes; res.json({ ok: true }) })

const port = process.env.PORT || 4000
app.listen(port, () => console.log('Backend listening on http://localhost:' + port))
