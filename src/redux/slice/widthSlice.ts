import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

interface State {
  width: number // Change the data type to number
}

const initialState: State = {
  width: 0 // Set an initial value (replace with your desired default value)
}

export const widthSlice = createSlice({
  name: 'width',
  initialState,
  reducers: {
    setWidth: (state: Draft<State>, action: PayloadAction<number>) => {
      // Accept a number payload
      state.width = action.payload
    }
  }
})

// Selectors
export const getWidth = (state: { width: State }) => state.width

// Reducers and actions
export const { setWidth } = widthSlice.actions

export default widthSlice.reducer
