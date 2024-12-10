import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const Route = createAPIFileRoute('/api/api/incidents')({
  GET: ({ request, params }) => {
    return json({ message: 'Hello "/api/api/incidents"!' })
  },
})
