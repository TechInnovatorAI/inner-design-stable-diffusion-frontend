import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slice/userSlice'
import promptSlice from './slice/promptSlice'
import tempUrlSlice from './slice/tempUrlSlice'
import widthSlice from './slice/widthSlice'
import heightSlice from './slice/heightSlice'
import materialPromptSlice from './slice/materialPromptSlice'
import materialTitleSlice from './slice/materialTitleSlice'
import colorPromptSlice from './slice/colorPromptSlice'
import colorTitleSlice from './slice/colorTitleSlice'
import floorPromptSlice from './slice/floorPromptSlice'
import floorTitleSlice from './slice/floorTitleSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    prompt: promptSlice,
    tempUrl: tempUrlSlice,
    width: widthSlice,
    height: heightSlice,
    materialPrompt: materialPromptSlice,
    materialTitle: materialTitleSlice,
    floorPrompt: floorPromptSlice,
    floorTitle: floorTitleSlice,
    colorPrompt: colorPromptSlice,
    colorTitle: colorTitleSlice
  }
})
