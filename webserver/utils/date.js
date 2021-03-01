const generateDate = (days, hours, mins, secs, milli) => {
  return new Date(Date.now() - days * hours * mins * secs * milli)
}

const generateDateInRange = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

module.exports = {
  generateDate,
  generateDateInRange
}
