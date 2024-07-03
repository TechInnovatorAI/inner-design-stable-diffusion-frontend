import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  materialPrompt: ''
} as any

export const materialPromptSlice = createSlice({
  name: 'materialPrompt',
  initialState,
  reducers: {
    setmaterialPrompt: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.materialPrompt = action.payload.materialPrompt
    }
  }
})

// Selectors
export const getmaterialPrompt = (state: { materialPrompt: any }) => state.materialPrompt

// Reducers and actions
export const { setmaterialPrompt } = materialPromptSlice.actions

export default materialPromptSlice.reducer
