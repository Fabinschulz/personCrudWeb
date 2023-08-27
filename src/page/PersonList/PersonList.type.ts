export type PersonList = {
  id: number
  name: string
  cpf: string
  phoneNumber: string
  email: string
  birthDate: string
}

export type PersonListProps = {
  rowData: PersonList[]
}
