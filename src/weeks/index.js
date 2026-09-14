// To add a new week: create weekN.js in this folder (default-exporting an
// array of { char, pinyin, def }) and add one line to the map below.
import week1 from './week1'
import week2 from './week2'

export default {
  1: week1,
  2: week2,
}
