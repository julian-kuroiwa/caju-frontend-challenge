import { HttpResponse, http } from 'msw'
import { registrationsMock } from './responses/registrations'

export const handlers = [
  http.get('http://localhost:3000/registrations', () => {
    return HttpResponse.json(registrationsMock)
  }),
]
