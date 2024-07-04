import { masks } from "./masks"

describe('masks', () => {
  it('should render cpf mask on xxx.xxx.xxx-xx', () => {
    const cpf = '58458632569'

    expect(masks.cpf(cpf)).toEqual('584.586.325-69')
  })

  it('should render date mask on dd/mm/yyyy', () => {
    const date = '10-10-2000'

    expect(masks.date(date)).toEqual('10/10/2000')
  })

  it('should throw an error if the value is empty', () => {
    const date = null

    expect(() => masks.date(date)).toThrow('Add a date string valid')
  })
 })