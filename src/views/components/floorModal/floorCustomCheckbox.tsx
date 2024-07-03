// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import FloorCheckboxItem from './floorCheckboxItem'

import { floorStyle } from 'src/context/promptValue'
import { setfloorPrompt } from 'src/redux/slice/floorPromptSlice'
import { setfloorTitle } from 'src/redux/slice/floorTitleSlice'

const FloorCustomCheckbox = () => {
  const initialSelected: string[] = floorStyle.filter(item => item.isSelected).map(item => item.value)
  const initialSelectedTitle: string[] = floorStyle.filter(item => item.isSelected).map(item => item.title)

  // ** State
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [selectedTitle, setSelectedTitle] = useState<string[]>(initialSelectedTitle)

  const dispatch = useDispatch()

  const handleChange = (id: number) => {
    if (selected.includes(floorStyle[id].value)) {
      const updatedArr = selected.filter(item => item !== floorStyle[id].value)
      const updatedTitleArr = selectedTitle.filter(item => item !== floorStyle[id].title)
      setSelected(updatedArr)
      setSelectedTitle(updatedTitleArr)
    } else {
      setSelected([...selected, floorStyle[id].value])
      setSelectedTitle([...selectedTitle, floorStyle[id].title])
    }
  }

  useEffect(() => {
    dispatch(setfloorPrompt({ floorPrompt: selected.join(', ') }))
    dispatch(setfloorTitle({ floorTitle: selectedTitle.join(', ') }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Grid container spacing={4}>
      {floorStyle.map((item, index) => (
        <FloorCheckboxItem
          key={index}
          data={floorStyle[index]}
          selected={selected}
          name='custom-checkbox-img'
          handleChange={handleChange}
          gridProps={{ sm: 4, xs: 4 }}
        />
      ))}
    </Grid>
  )
}

export default FloorCustomCheckbox
