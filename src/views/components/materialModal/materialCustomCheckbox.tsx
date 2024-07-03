// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import MaterialCheckboxItem from './materialCheckboxItem'

import { materialStyle } from 'src/context/promptValue'
import { setmaterialPrompt } from 'src/redux/slice/materialPromptSlice'
import { setmaterialTitle } from 'src/redux/slice/materialTitleSlice'

const MaterialCustomCheckbox = () => {
  const initialSelected: string[] = materialStyle.filter(item => item.isSelected).map(item => item.value)
  const initialSelectedTitle: string[] = materialStyle.filter(item => item.isSelected).map(item => item.title)

  // ** State
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [selectedTitle, setSelectedTitle] = useState<string[]>(initialSelectedTitle)

  const dispatch = useDispatch()

  const handleChange = (id: number) => {
    if (selected.includes(materialStyle[id].value)) {
      const updatedArr = selected.filter(item => item !== materialStyle[id].value)
      const updatedTitleArr = selectedTitle.filter(item => item !== materialStyle[id].title)
      setSelected(updatedArr)
      setSelectedTitle(updatedTitleArr)
    } else {
      setSelected([...selected, materialStyle[id].value])
      setSelectedTitle([...selectedTitle, materialStyle[id].title])
    }
  }

  useEffect(() => {
    dispatch(setmaterialPrompt({ materialPrompt: selected.join(', ') }))
    dispatch(setmaterialTitle({ materialTitle: selectedTitle.join(', ') }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Grid container spacing={4}>
      {materialStyle.map((item, index) => (
        <MaterialCheckboxItem
          key={index}
          data={materialStyle[index]}
          selected={selected}
          name='custom-checkbox-img'
          handleChange={handleChange}
          gridProps={{ sm: 4, xs: 4 }}
        />
      ))}
    </Grid>
  )
}

export default MaterialCustomCheckbox
