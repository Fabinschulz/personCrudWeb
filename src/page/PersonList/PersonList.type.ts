import { IPersonFull } from '@/service/person/person.interface'

export type PersonListProps = {
  rowData: IPersonFull[]
  handleDelete: (personId: string) => void
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
