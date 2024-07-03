// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'

// ** Type Imports
import { OriginRadioImgProps } from '../types'

const OriginRadioImg = (props: OriginRadioImgProps) => {
  // ** Props
  const { index, name, data, selected, handleChange } = props

  const { alt, img, value } = data

  const renderComponent = () => {
    return (
      <Grid>
        <Box
          onClick={() => handleChange(index)}
          sx={{
            height: '100%',
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            border: theme => `2px solid ${theme.palette.divider}`,
            ...(selected === index
              ? { borderColor: `cyan` }
              : { '&:hover': { borderColor: theme => `rgba(${theme.palette.customColors.main}, 0.25)` } }),
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          }}
        >
          {typeof img === 'string' ? (
            <img src={img} alt={alt ?? `radio-image-${value}`} style={{ minHeight: '150px' }} />
          ) : (
            img
          )}
          <Radio
            name={name}
            size='small'
            value={value}
            onChange={handleChange}
            checked={selected === value}
            sx={{ zIndex: -1, position: 'absolute', visibility: 'hidden' }}
          />
        </Box>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}

export default OriginRadioImg
