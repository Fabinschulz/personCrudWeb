/* eslint-disable react/no-children-prop */
import React, { FC, useState } from 'react'
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
  Select,
  MenuItem,
  Pagination,
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
import Modal from '@/app/components/Modal'

const DataTablePersonList: FC<PersonListProps> = ({
  rowData,
  handleDelete,
  openModal,
  setOpenModal,
}) => {
  const [personId, setPersonId] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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

  const closeModal = () => setOpenModal(false)

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedData = rowData?.slice(startIndex, endIndex)

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleChangeRowsPerPage = (value: number) => {
    setRowsPerPage(value)
    setPage(1)
  }

  return (
    <React.Fragment>
      <Modal
        title="Tem certeza que deseja excluir o registro?"
        description="Ao confirmar, o registro será excluído permanentemente."
        open={openModal}
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
              {paginatedData?.map((row, index) => (
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
                          setOpenModal(true)
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
                  colSpan={5}
                  align="right"
                >
                  row page:
                  <Select
                    className="ml-2 h-8 rounded-md border border-gray-300"
                    size="small"
                    value={rowsPerPage}
                    onChange={(event) =>
                      handleChangeRowsPerPage(event.target.value as number)
                    }
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={tableHeaderCellStyle} colSpan={6} align="right">
                  <Pagination
                    count={Math.ceil(rowData?.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                  />
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
