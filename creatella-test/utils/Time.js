
// generate relative date to the date specified by input
export function getRelativeDate(pivot) {
  let delta = Math.round((new Date - new Date(pivot)) / 1000)
  let minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    output

  if (delta < 30) output = 'just then'
  else if (delta < minute) output = delta + ' seconds ago'
  else if (delta < 2 * minute) output = 'a minute ago'
  else if (delta < hour) output = Math.floor(delta / minute) + ' minutes ago'
  else if (Math.floor(delta / hour) == 1) output = '1 hour ago'
  else if (delta < day) output = Math.floor(delta / hour) + ' hours ago'
  else if (delta < day * 2) output = 'yesterday'
  else if (delta < day * 3) output = '2 days ago'
  else if (delta < day * 4) output = '3 days ago'
  else if (delta < day * 5) output = '4 days ago'
  else if (delta < day * 6) output = '5 days ago'
  else if (delta < day * 7) output = '6 days ago'
  else if (delta < day * 8) output = 'a week ago'
  else output = exports.getReadableDate(new Date(pivot))

  return output
}

// format the date, so all human could read it
export function getReadableDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()

  return day + ' ' + monthNames[monthIndex] + ' ' + year
}
