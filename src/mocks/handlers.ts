import { rest } from 'msw'
import { registrationsMock } from './responses/registrations'

export const handlers = [
  rest.get('http://localhost:3000/registrations', (req, res, ctx) => {
    const filteredCpf = req.url.searchParams.get('cpf')
    
    if (filteredCpf) {
      const filterRegistrationByCpf = registrationsMock.filter(filteredRegistration => filteredRegistration.cpf === filteredCpf)
      return res(ctx.json(filterRegistrationByCpf))
    }

    return res(
      ctx.json(registrationsMock),
    )

  }),
  rest.put('http://localhost:3000/registrations/:id', async (req, res, ctx) => {
    const registrationStatusChanged = await req.json()

    return res(
      ctx.json(registrationStatusChanged),
    )
  }),
  rest.delete('http://localhost:3000/registrations/:id', async (_, res, ctx) => {
    return res(
      ctx.status(201),
    )
  }),
]
