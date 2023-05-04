export const dateConverter = (string) => {
  const date = new Date(string)
  const mm = date.getMonth() + 1 // getMonth() is zero-based
  const dd = date.getDate()
  const dayOfWeek = date.getDay()
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const hour = date.getHours()
  const mins = date.getMinutes()
  return [
    daysOfWeek[dayOfWeek],
    ' ',
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
