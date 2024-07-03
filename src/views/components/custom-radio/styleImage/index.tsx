import { useDispatch } from 'react-redux'
import { setPrompt } from 'src/redux/slice/promptSlice'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import { Typography } from '@mui/material'

// ** Type Imports
import { CustomRadioImgProps } from '../types'

const CustomRadioImg = (props: CustomRadioImgProps) => {
  // ** Props
  const {
    name,
    data,
    selected

    // handleChange

    // color = 'primary'
  } = props
  const dispatch = useDispatch()

  const { alt, img, value, title, styleId } = data

  const handleStyle = (styleId: number, value: string) => {
    // handleChange(styleId)
    dispatch(setPrompt({ prompt: value }))
    console.log('value', value)
  }

  const renderComponent = () => {
    return (
      <Grid>
        <Box
          onClick={() => handleStyle(styleId, value)}
          sx={{
            height: '140px',
            width: '140px',
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            border: theme => `2px solid ${theme.palette.divider}`,
            ...(selected === styleId
              ? { borderColor: `cyan` }
              : {
                  '&:hover': {
                    borderColor: theme => `rgba(${theme.palette.customColors.main}, 0.25)`
                  }
                }),
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          }}
        >
          <Typography
            sx={{
              color: 'white',
              position: 'absolute',
              top: 0,
              background: '#000000',
              width: '100%',
              textAlign: 'center',
              opacity: 0.7,
              padding: 0.5
            }}
            variant='body2'
          >
            {title}
          </Typography>
          {typeof img === 'string' ? (
            <img id={`roomstyle${styleId}`} src={img} alt={alt ?? `radio-image-${value}`} />
          ) : (
            img
          )}
          <Radio
            name={name}
            size='small'
            value={value}
            checked={selected === styleId}
            sx={{ zIndex: -1, position: 'absolute', visibility: 'hidden' }}
          />
        </Box>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}

export default CustomRadioImg
