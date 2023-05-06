// convert meters to Kilometers

export const toKm = (m) => {
  let km = m / 1000
  km = km.toFixed(2) + ' km'
  return km
}

export const dateConverter = (string) => {
  const date = new Date(string)
  const mm = date.getMonth() + 1 // getMonth() is zero-based
  const dd = date.getDate()

  const hour = date.getHours()
  const mins = date.getMinutes()
  return [
    (dd > 9 ? '' : '0') + dd,
    '-',
    (mm > 9 ? '' : '0') + mm,
    '-',
    date.getFullYear(),
    '  ',
    (hour > 9 ? '' : '0') + hour,
    ':',
    (mins > 9 ? '' : '0') + mins,
  ].join('')
}

export const toMinutes = (s) => {
  const minutes = Math.floor(s / 60)
  if (minutes < 1) return ' Less than a minute'
  else return Math.floor(s / 60) + ' minute(s)'
}
