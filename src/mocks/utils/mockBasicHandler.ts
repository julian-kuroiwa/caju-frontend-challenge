import { rest } from 'msw'

import { server } from '../server'

interface MockRestBasicHandlerParams {
  path: string
  type: 'get' | 'post' | 'put' | 'delete'
  response?: Record<string, any>
  status?: number
}

export const mockRestBasicHandler = ({
  path,
  type,
  response,
  status = 200,
}: MockRestBasicHandlerParams) => {
  server.use(
    rest[type](path, (_req, res, ctx) => {
      return res(ctx.status(status), ctx.json(response))
    }),
  )
}
