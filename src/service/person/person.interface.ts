export interface IPersonListProps {
  page: number
  size: number
  searchString?: string
  isDeleted?: boolean
  orderBy?: string
}

export interface Address {
  addressName: string
  zipCode: string
  city: string
  state: string
  uf: string
  ufDisplay: string
  district: string
  number: string
  complement: string
}

export interface IPersonFull {
  personId: string
  registrationNumber: string
  personName: string
  email: string
  phoneNumber: string
  address: Address[]
  birthDate: Date
}
