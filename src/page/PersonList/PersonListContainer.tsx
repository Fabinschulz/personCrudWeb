import DataTablePersonList from './PersonList'
import { mockDataPerson } from './dataTable.mock'
import React from 'react'

export default function DataGridContainer() {
  const data = mockDataPerson
  return (
    <React.Fragment>
      <h1 className="mb-16 text-2xl font-extrabold md:text-8xl">Pessoas</h1>
      <DataTablePersonList rowData={data} />
    </React.Fragment>
  )
}
