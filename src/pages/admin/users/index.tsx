// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import { useTheme } from '@mui/material/styles'

// ** Access api
import { countUsers, paginateUser } from '../../api/adminService'
import { DateType, UsersType } from 'src/context/types'
import { timeFormat } from 'src/views/utils/timeFormat'
import { Button, TextField } from '@mui/material'
import router from 'next/router'
import PickersRange from 'src/views/components/pickersRange'
import { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import addDays from 'date-fns/addDays'

type Order = 'asc' | 'desc'

interface HeadCell {
  disablePadding: boolean
  id: keyof UsersType
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof UsersType) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableToolbarProps {
  numSelected: number
}

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
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: '住所'
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: '電話番号'
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: '作成日'
  },
  {
    id: 'lastlogindate',
    numeric: false,
    disablePadding: false,
    label: '最終ログイン'
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: '役割'
  }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof UsersType) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{ 'aria-label': 'select all desserts' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>
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

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  // ** Prop
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        px: theme => `${theme.spacing(5)} !important`,
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} 選択済み
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          ユーザーリスト
        </Typography>
      )}
    </Toolbar>
  )
}

const UserManagement = () => {
  // ** States
  const [userList, setUserList] = useState<UsersType[]>([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [orderBy, setOrderBy] = useState<keyof UsersType>('name')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const [startDateRange, setStartDateRange] = useState<DateType>(addDays(new Date(), -30))
  const [endDateRange, setEndDateRange] = useState<DateType>(new Date())
  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof UsersType) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
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
    const countRes = countUsers()
    countRes
      .then(({ data }: any) => {
        setCount(data.count._all)
        console.log(data.count._all)
      })
      .catch(err => {
        console.log(err)
      })
    const res = paginateUser(page, rowsPerPage, orderBy, order, searchValue, startDateRange, endDateRange)
    res
      .then(({ data }: any) => {
        setUserList(data)
      })
      .catch(err => {
        console.log(err)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, orderBy, order, searchValue, endDateRange])

  const handleSearch = (e: any) => {
    if (e.key == 'Enter') {
      console.log(searchValue)
    }
  }

  return (
    <>
      <EnhancedTableToolbar numSelected={selected.length} />
      <DatePickerWrapper sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PickersRange
          popperPlacement={popperPlacement}
          startDateRange={startDateRange}
          endDateRange={endDateRange}
          setStartDateRange={setStartDateRange}
          setEndDateRange={setEndDateRange}
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
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                  </TableCell>
                  <TableCell align='left'>R{100 + data.id}</TableCell>
                  <TableCell component='th' id={labelId} scope='row' padding='none'>
                    {data.name}
                  </TableCell>
                  <TableCell align='left'>{data.email}</TableCell>
                  <TableCell align='left'>{data.lastname}</TableCell>
                  <TableCell align='left'>{data.firstname}</TableCell>
                  {/* <TableCell align='left'>{data.genNumber}</TableCell> */}
                  <TableCell align='left'>{data.address}</TableCell>
                  <TableCell align='left'>{data.phoneNumber}</TableCell>
                  <TableCell align='left'>{timeFormat(data.createdAt)}</TableCell>
                  <TableCell align='left'>{timeFormat(data.lastlogindate)}</TableCell>
                  <TableCell align='left'>{data.role}</TableCell>
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

export default UserManagement
