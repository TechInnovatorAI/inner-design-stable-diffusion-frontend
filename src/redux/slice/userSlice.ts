import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  userstate: false
} as any

export const userstateSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    setUserstate: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
      state.userstate = action.payload.userstate
    },
    resetUserstate: (state: Draft<typeof initialState>) => {
      state.userstate = false
    }
  }
})

// Selectors
export const getUserstate = (state: { userstate: any }) => state.userstate

// Reducers and actions
export const { setUserstate, resetUserstate } = userstateSlice.actions

export default userstateSlice.reducer
