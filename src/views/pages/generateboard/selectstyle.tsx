import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import CustomRadioImg from 'src/views/components/custom-radio/styleImage'
import { designStyle } from 'src/context/promptValue'

const Selectstyle = ({ selected }: { selected: number }) => {
  const scrollTo = (selected: number) => {
    const element = document.getElementById(`roomstyle${selected}`)
    element?.scrollIntoView()
  }

  useEffect(() => {
    scrollTo(selected)
  }, [selected])

  return (
    <Grid
      container
      overflow={{ xs: 'auto' }}
      gap={1}
      flexWrap={{ xs: 'nowrap' }}
      justifyContent={{ xs: 'normal' }}
      className='scroll'
    >
      {designStyle.map((item, index) => (
        <CustomRadioImg
          key={index}
          data={designStyle[index]}
          selected={selected}
          name='custom-radios-img'

          // handleChange={handleChange}
        />
      ))}
    </Grid>
  )
}

export default Selectstyle
