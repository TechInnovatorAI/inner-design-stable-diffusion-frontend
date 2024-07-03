import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  prompt: 'Scandinavian style'
} as any

export const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setPrompt: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.prompt = action.payload.prompt
    }
  }
})

// Selectors
export const getPrompt = (state: { prompt: any }) => state.prompt

// Reducers and actions
export const { setPrompt } = promptSlice.actions

export default promptSlice.reducer
