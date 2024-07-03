import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  colorTitle: ''
} as any

export const colorTitleSlice = createSlice({
  name: 'colorTitle',
  initialState,
  reducers: {
    setcolorTitle: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.colorTitle = action.payload.colorTitle
    }
  }
})

// Selectors
export const getcolorTitle = (state: { colorTitle: any }) => state.colorTitle

// Reducers and actions
export const { setcolorTitle } = colorTitleSlice.actions

export default colorTitleSlice.reducer
