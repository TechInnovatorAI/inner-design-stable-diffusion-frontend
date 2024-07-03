import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  materialTitle: ''
} as any

export const materialTitleSlice = createSlice({
  name: 'materialTitle',
  initialState,
  reducers: {
    setmaterialTitle: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.materialTitle = action.payload.materialTitle
    }
  }
})

// Selectors
export const getmaterialTitle = (state: { materialTitle: any }) => state.materialTitle

// Reducers and actions
export const { setmaterialTitle } = materialTitleSlice.actions

export default materialTitleSlice.reducer
