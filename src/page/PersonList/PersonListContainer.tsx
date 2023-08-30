'use client'
import { usePersonsList } from '@/hooks/usePerson'
import DataTablePersonList from './PersonList'
import { mockDataPerson } from './dataTable.mock'
import React, { useState } from 'react'
import { IPersonFull } from '@/service/person/person.interface'
import Link from 'next/link'
import { deletePersonById } from '@/service/person'
import CustomLinearProgress from '@/app/components/Loading'
import Toast from '@/app/components/Toast'

export default function PersonListContainer() {
  const { data, isFetching, refetch } = usePersonsList({
    page: 0,
    size: 10,
  })
  const [openModal, setOpenModal] = useState(false)
  const [toast, setToast] = useState({
    message: '',
    severity: 'success',
    open: false,
  })

  const mockData = (data as unknown as IPersonFull[]) ?? mockDataPerson

  const closeModal = () => setOpenModal(false)
  const handleDelete = (personId: string) => {
    deletePersonById(personId)
      .then((res) => {
        setToast({
          message: 'Ótimo! Pessoa deletada com sucesso!',
          severity: 'success',
          open: true,
        })
      })
      .catch((err) => {
        setToast({
          message: `Ops! Ocorreu um erro ao deletar a pessoa. Error: ${err.message}`,
          severity: 'error',
          open: true,
        })
      })
      .finally(() => closeModal())
  }

  return (
    <>
      <Toast
        open={toast.open}
        onClose={() => {
          setToast({ ...toast, open: false })
        }}
        message={toast.message}
        severity={toast.severity}
      />
      {isFetching && <CustomLinearProgress />}
      <main className="items-center justify-center p-10">
        <div className="rounded-lg border border-[##BABFD0] p-10">
          <div className="mb-8 flex flex-col items-center justify-between md:mb-16 md:flex-row">
            <h1 className="text-2xl font-bold md:text-4xl">Pessoas</h1>
            <div className="mt-4 flex flex-col items-center justify-center md:flex-row md:justify-start">
              <button
                onClick={() => refetch()}
                type="button"
                className="mb-2 mr-0 rounded-lg border border-[#081b29] bg-[#081b29] px-6 py-2 font-bold text-sky-200 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 md:mb-0 md:mr-4 md:px-10 md:py-3"
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
          <DataTablePersonList
            {...{ openModal, setOpenModal, handleDelete, rowData: mockData }}
          />
        </div>
      </main>
    </>
  )
}
