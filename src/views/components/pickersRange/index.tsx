// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/context/types'

interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}

const PickersRange = ({
  popperPlacement,
  startDateRange,
  endDateRange,
  setStartDateRange,
  setEndDateRange
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  startDateRange: DateType
  endDateRange: DateType
  setStartDateRange: (DateType: DateType) => void
  setEndDateRange: (DateType: DateType) => void
}) => {
  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePicker
          selectsRange
          monthsShown={2}
          endDate={endDateRange}
          selected={startDateRange}
          startDate={startDateRange}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          popperPlacement={popperPlacement}
          customInput={
            <CustomInput label='日時' end={endDateRange as Date | number} start={startDateRange as Date | number} />
          }
        />
      </div>
    </Box>
  )
}

export default PickersRange
