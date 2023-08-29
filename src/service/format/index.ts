export function formatDocumentNumber(value: string) {
  if (!value || !value.replace) return value
  const cpf = value.replace(/\D/g, '')

  if (cpf.length <= 11)
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')

  return null
}
