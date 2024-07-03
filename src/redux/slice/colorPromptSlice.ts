import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  colorPrompt: ''
} as any

export const colorPromptSlice = createSlice({
  name: 'colorPrompt',
  initialState,
  reducers: {
    setcolorPrompt: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.colorPrompt = action.payload.colorPrompt
    }
  }
})

// Selectors
export const getcolorPrompt = (state: { colorPrompt: any }) => state.colorPrompt

// Reducers and actions
export const { setcolorPrompt } = colorPromptSlice.actions

export default colorPromptSlice.reducer
