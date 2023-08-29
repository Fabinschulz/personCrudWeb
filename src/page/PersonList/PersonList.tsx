/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Stack,
  IconButton,
} from '@mui/material'
import Link from 'next/link'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import {
  personListContainerStyle,
  personListTableStyle,
  tableCellStyle,
  tableHeaderCellStyle,
} from './PersonList.styled'
import { PersonListProps } from './PersonList.type'
import React, { FC, useState } from 'react'
import Modal from '@/app/components/Modal'

const DataTablePersonList: FC<PersonListProps> = ({
  rowData,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false)
  const [personId, setPersonId] = useState('')
  const headers = {
    name: 'Nome',
    cpf: 'CPF',
    email: 'Email',
    phoneNumber: 'Telefone',
    birthDate: 'Data de Nascimento',
    actions: 'Ações',
  }

  const keysToShow = Object.keys(headers) as (keyof typeof headers)[]
  const renderCell = (row: any, key: keyof typeof headers) => (
    <TableCell align="center" sx={tableCellStyle}>
      {row[key]}
    </TableCell>
  )

  const closeModal = () => setOpen(false)

  return (
    <React.Fragment>
      <Modal
        title="Tem certeza que deseja excluir o registro?"
        description="Ao confirmar, o registro será excluído permanentemente."
        open={open}
        onClose={closeModal}
        sizeModal="large"
        children={
          <div className=" my-5 flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="rounded-md border border-sky-300 px-4 py-2 text-sky-400"
            >
              Cancelar
            </button>
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
              onClick={() => handleDelete(personId)}
            >
              Confirmar
            </button>
          </div>
        }
      />
      <Grid sx={personListContainerStyle}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            aria-label="a dense table"
            sx={personListTableStyle}
          >
            <TableHead>
              <TableRow>
                {keysToShow.map((key) => (
                  <TableCell key={key} align="center" sx={tableHeaderCellStyle}>
                    {headers[key]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.map((row, index) => (
                <TableRow key={index}>
                  {renderCell(row, 'name')}
                  {renderCell(row, 'cpf')}
                  {renderCell(row, 'email')}
                  {renderCell(row, 'phoneNumber')}
                  {renderCell(row, 'birthDate')}
                  <TableCell align="center" sx={tableCellStyle}>
                    <Stack
                      component={Grid}
                      direction={'row'}
                      justifyContent="center"
                      alignItems="center"
                      style={{
                        textAlign: 'left',
                        marginLeft: '-4px',
                      }}
                    >
                      <Link href={`person/${row.personId}`}>
                        <IconButton>
                          <TbEdit sx={{ height: 20, width: 20 }} />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => {
                          setOpen(true)
                          setPersonId(row.personId)
                        }}
                      >
                        <RiDeleteBin6Line sx={{ height: 20, width: 20 }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  sx={{ ...tableHeaderCellStyle, pr: 5 }}
                  colSpan={6}
                  align="right"
                >
                  Total de registros: {rowData?.length}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </React.Fragment>
  )
}

export default DataTablePersonList
