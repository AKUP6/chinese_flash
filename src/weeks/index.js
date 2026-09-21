// To add a new week: create weekN.js in this folder (default-exporting an
// array of { char, pinyin, def }) and add one line to the map below.
import week1 from './week1'
import week2 from './week2'
import week3 from './week3'
import week4 from './week4'
import week5 from './week5'

export default {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
}
