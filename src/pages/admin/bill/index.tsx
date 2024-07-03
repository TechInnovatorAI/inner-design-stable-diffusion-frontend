// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import { useTheme } from '@mui/material/styles'

// ** Access api
import { countUsers, paginateBillList } from '../../api/adminService'
import { BillType } from 'src/context/types'
import { Button, Grid, TextField } from '@mui/material'
import router from 'next/router'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomInput from 'src/views/components/CustomInput'
import { timeFormat } from 'src/views/utils/timeFormat'

type Order = 'asc' | 'desc'

interface HeadCell {
  disablePadding: boolean
  id: keyof BillType
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof BillType) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

// interface EnhancedTableToolbarProps {
//   numSelected: number
// }

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ユーザー名'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Eメール'
  },
  {
    id: 'lastname',
    numeric: false,
    disablePadding: false,
    label: '姓'
  },
  {
    id: 'firstname',
    numeric: false,
    disablePadding: false,
    label: '名'
  },
  {
    id: 'currentMonthsGenNumber',
    numeric: true,
    disablePadding: false,
    label: '指定月の利用回数'
  },
  {
    id: 'genNumber',
    numeric: true,
    disablePadding: false,
    label: 'トータル利用回数'
  }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  // ** Props
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof BillType) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>プロジェクト</TableCell>
      </TableRow>
    </TableHead>
  )
}

const BillManagement = () => {
  // ** States
  const [userList, setUserList] = useState<BillType[]>([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [orderBy, setOrderBy] = useState<keyof BillType>('name')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof BillType) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date } | null>(null)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      const startDate = new Date(date)
      startDate.setDate(11) // Set the day to the 10th of the selected month
      const endDate = new Date(startDate)

      if (startDate.getMonth() === 0) {
        // If the selected month is January, go back to December of the previous year
        startDate.setFullYear(startDate.getFullYear() - 1)
        startDate.setMonth(11) // December
      } else {
        startDate.setMonth(startDate.getMonth() - 1) // Go to the previous month
      }

      endDate.setDate(10) // Set the day to the 10th of the selected month

      setDateRange({ startDate, endDate })
    }
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = userList.map(n => n.name)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (email: string) => selected.indexOf(email) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0

  useEffect(() => {
    console.log(dateRange?.startDate)
    const countRes = countUsers()
    countRes
      .then(({ data }: any) => {
        setCount(data.count._all)
        console.log(data.count._all)
      })
      .catch(err => {
        console.log(err)
      })
    const res = paginateBillList(
      page,
      rowsPerPage,
      orderBy,
      order,
      searchValue,
      dateRange?.startDate,
      dateRange?.endDate
    )
    res
      .then(({ data }: any) => {
        setUserList(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [page, rowsPerPage, orderBy, order, searchValue, dateRange])

  const handleSearch = (e: any) => {
    if (e.key == 'Enter') {
      console.log(searchValue)
    }
  }

  return (
    <>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      <DatePickerWrapper sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DatePicker
          selected={selectedDate}
          id='month-picker'
          showMonthYearPicker
          dateFormat='MM/yyyy'
          popperPlacement={popperPlacement}
          onChange={handleDateChange}
          customInput={<CustomInput label='Month Picker' />}
        />

        <TextField
          label='Search'
          id='size-small'
          defaultValue=''
          size='small'
          onKeyDown={e => handleSearch(e)}
          onChange={e => setSearchValue(e.target.value)}
        />
      </DatePickerWrapper>
      <Grid paddingX={6} paddingY={2} sx={{ display: 'flex' }}>
        {dateRange ? (
          <>
            <p>検索期間: {timeFormat(dateRange.startDate.toDateString())}</p>
            <p> ~ </p>
            <p> {timeFormat(dateRange.endDate.toDateString())}</p>
          </>
        ) : (
          <p> 上記から表示したい月を指定してください。 </p>
        )}
      </Grid>
      <TableContainer component={Paper} className='scroll'>
        <Table sx={{ minWidth: 1600 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            rowCount={count}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {userList.map((data, index) => {
              const isItemSelected = isSelected(data.email)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={data.email}
                  role='checkbox'
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                  onClick={event => handleClick(event, data.email)}
                >
                  {/* <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                  </TableCell> */}
                  <TableCell align='left'>R{100 + data.id}</TableCell>
                  <TableCell component='th' id={labelId} scope='row' padding='none'>
                    {data.name}
                  </TableCell>
                  <TableCell align='left'>{data.email}</TableCell>
                  <TableCell align='left'>{data.lastname}</TableCell>
                  <TableCell align='left'>{data.firstname}</TableCell>
                  <TableCell align='left'>{data.currentMonthsGenNumber}</TableCell>
                  <TableCell align='left'>{data.genNumber}</TableCell>
                  <TableCell align='left'>
                    <Button onClick={() => router.push(`/acl?id=${data.id}&name=${data.name}`)}>詳細</Button>
                  </TableCell>
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
              <TableRow
                sx={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default BillManagement
