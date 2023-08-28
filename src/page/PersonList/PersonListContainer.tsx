import DataTablePersonList from './PersonList'
import { mockDataPerson } from './dataTable.mock'
import React from 'react'

export default function DataGridContainer() {
  const data = mockDataPerson
  return <DataTablePersonList rowData={data} />
}
