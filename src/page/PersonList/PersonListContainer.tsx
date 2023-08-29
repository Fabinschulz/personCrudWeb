'use client'

import { usePersonsList } from '@/hooks/usePerson'
import DataTablePersonList from './PersonList'
import { mockDataPerson } from './dataTable.mock'
import React from 'react'
import { IPersonFull } from '@/service/person/person.interface'
import Link from 'next/link'
import { deletePersonById } from '@/service/person'

export default function DataGridContainer() {
  const { data, isFetching, refetch } = usePersonsList({
    page: 0,
    size: 10,
  })

  const mockData = (data as unknown as IPersonFull[]) ?? mockDataPerson

  const handleDelete = (personId: string) => {
    deletePersonById(personId)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {isFetching && 'Carregando...'}
      <main className="h-screen items-center justify-center p-10">
        <div className="rounded-lg border border-[##BABFD0] p-10">
          <div className="mb-8 flex flex-col items-center justify-between md:mb-16 md:flex-row">
            <h1 className="text-2xl font-bold md:text-4xl">Pessoas</h1>
            <div className="mt-4 flex items-center justify-center md:mt-6 md:justify-start">
              <button
                onClick={() => refetch()}
                type="button"
                className="mr-4 rounded-lg border border-[#081b29] bg-[#081b29] px-6 py-2 font-bold text-sky-200 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 md:px-10 md:py-3"
              >
                Atualizar
              </button>
              <Link href="/person/new">
                <button
                  type="button"
                  className="rounded-lg border border-sky-300 px-6 py-2 font-bold text-sky-300 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 md:px-10 md:py-3"
                >
                  Novo cadastro
                </button>
              </Link>
            </div>
          </div>
          <DataTablePersonList rowData={mockData} handleDelete={handleDelete} />
        </div>
      </main>
    </>
  )
}
