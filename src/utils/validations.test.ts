import { validations } from "./validations"

describe('validations', () => {
  describe('cpf', () => {
    it('should be false if cpf is 00000000000', () => {
      expect(validations.cpf('00000000000')).toBeFalsy()
    })

    it('should be false if cpf length is < than 11', () => {
      expect(validations.cpf('2569856989')).toBeFalsy()
    })

    it('should be true if cpf is valid', () => {
      expect(validations.cpf('96308630063')).toBeTruthy()
    })
  })
 })