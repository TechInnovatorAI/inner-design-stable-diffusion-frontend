import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  floorTitle: ''
} as any

export const floorTitleSlice = createSlice({
  name: 'floorTitle',
  initialState,
  reducers: {
    setfloorTitle: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.floorTitle = action.payload.floorTitle
    }
  }
})

// Selectors
export const getfloorTitle = (state: { floorTitle: any }) => state.floorTitle

// Reducers and actions
export const { setfloorTitle } = floorTitleSlice.actions

export default floorTitleSlice.reducer
