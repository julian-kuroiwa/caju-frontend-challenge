import { sanitize } from "./sanitize"

describe('sanitize', () => {
  it('should remove any special characters', () => {
    const value = '45df?><sdf[]}~|teste'

    expect(sanitize(value)).toEqual('45dfsdfteste')
  })
 })