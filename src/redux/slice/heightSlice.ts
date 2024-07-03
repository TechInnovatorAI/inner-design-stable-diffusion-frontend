import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

interface State {
  height: number // Change the data type to number
}

const initialState: State = {
  height: 0 // Set an initial value (replace with your desired default value)
}

export const heightSlice = createSlice({
  name: 'height',
  initialState,
  reducers: {
    setHeight: (state: Draft<State>, action: PayloadAction<number>) => {
      // Accept a number payload
      state.height = action.payload
    }
  }
})

// Selectors
export const getHeight = (state: { height: State }) => state.height.height

// Reducers and actions
export const { setHeight } = heightSlice.actions

export default heightSlice.reducer
