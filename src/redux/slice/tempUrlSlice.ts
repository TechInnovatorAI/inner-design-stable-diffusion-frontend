import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tempUrl: ''
} as any

export const tempUrlSlice = createSlice({
  name: 'tempUrl',
  initialState,
  reducers: {
    setTempUrl: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.tempUrl = action.payload.tempUrl
    }
  }
})

// Selectors
export const getTempUrl = (state: { tempUrl: any }) => state.tempUrl

// Reducers and actions
export const { setTempUrl } = tempUrlSlice.actions

export default tempUrlSlice.reducer
