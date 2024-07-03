import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  floorPrompt: ''
} as any

export const floorPromptSlice = createSlice({
  name: 'floorPrompt',
  initialState,
  reducers: {
    setfloorPrompt: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.floorPrompt = action.payload.floorPrompt
    }
  }
})

// Selectors
export const getfloorPrompt = (state: { floorPrompt: any }) => state.floorPrompt

// Reducers and actions
export const { setfloorPrompt } = floorPromptSlice.actions

export default floorPromptSlice.reducer
