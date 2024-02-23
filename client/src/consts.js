import { Dimensions } from "react-native"

export const WIDTH_SCREEN = Dimensions.get('screen').width
export const WIDTH_BUTTONS = (WIDTH_SCREEN / 3) - 15
export const HEIGHT_BUTTONS = WIDTH_BUTTONS

const X = 'x'
const O = 'o'

export const STYLE_BUTTONS = [
  {borderRightWidth: 5, borderBottomWidth: 5},
  {borderWidth: 5, borderTopWidth: 0},
  {borderWidth: 5, borderRightWidth: 0, borderTopWidth: 0},
  {borderWidth: 5, borderLeftWidth: 0},
  {borderWidth: 5},
  {borderWidth: 5, borderRightWidth: 0},
  {borderWidth: 5, borderLeftWidth: 0, borderBottomWidth: 0},
  {borderWidth: 5, borderBottomWidth: 0},
  {borderWidth: 5, borderBottomWidth: 0, borderRightWidth: 0},
]

export const SEQUENCES_WIN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]