// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ColorCheckboxItem from './ColorCheckboxItem'

import { colorStyle } from 'src/context/promptValue'
import { setcolorPrompt } from 'src/redux/slice/colorPromptSlice'
import { setcolorTitle } from 'src/redux/slice/colorTitleSlice'

const ColorCustomCheckbox = () => {
  const initialSelected: string[] = colorStyle.filter(item => item.isSelected).map(item => item.value)
  const initialSelectedTitle: string[] = colorStyle.filter(item => item.isSelected).map(item => item.title)

  // ** State
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [selectedTitle, setSelectedTitle] = useState<string[]>(initialSelectedTitle)

  const dispatch = useDispatch()

  const handleChange = (id: number) => {
    if (selected.includes(colorStyle[id].value)) {
      const updatedArr = selected.filter(item => item !== colorStyle[id].value)
      const updatedTitleArr = selectedTitle.filter(item => item !== colorStyle[id].title)
      setSelected(updatedArr)
      setSelectedTitle(updatedTitleArr)
    } else {
      setSelected([...selected, colorStyle[id].value])
      setSelectedTitle([...selectedTitle, colorStyle[id].title])
    }
  }

  useEffect(() => {
    dispatch(setcolorPrompt({ colorPrompt: selected.join(', ') }))
    dispatch(setcolorTitle({ colorTitle: selectedTitle.join(', ') }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Grid container spacing={4}>
      {colorStyle.map((item, index) => (
        <ColorCheckboxItem
          key={index}
          data={colorStyle[index]}
          selected={selected}
          name='custom-checkbox-img'
          handleChange={handleChange}
          gridProps={{ sm: 4, xs: 4 }}
        />
      ))}
    </Grid>
  )
}

export default ColorCustomCheckbox
