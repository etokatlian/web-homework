export const sortByDate = (dateSlice) => {
  return dateSlice.sort((a, b) => {
    const date1 = Date.parse(a.createdAt)
    const date2 = Date.parse(b.createdAt)

    if (date1 > date2) {
      return -1
    } else if (date1 === date2) {
      return 0
    } else {
      return 1
    }
  })
}
