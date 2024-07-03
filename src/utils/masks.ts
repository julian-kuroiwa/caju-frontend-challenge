export const masks = {
  cpf: (value: string) => {
    return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
  },
  date: (value: string) => {
    if (!value) throw new Error('Add a date string valid')

    let date = new Date(value)

    if (!date.getDate()) {
      const splitStringDate = value.split("/");

      const year = parseInt(splitStringDate[2], 10);
      const month = parseInt(splitStringDate[1], 10) - 1;
      const day = parseInt(splitStringDate[0], 10);

      date = new Date(year, month, day)
    }

    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }
}