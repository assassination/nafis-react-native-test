
// return true if input is null or undefined
export function isNil(input) {
  return (input == null || typeof input === 'undefined')
}

// check if input is empty or not
export function isEmpty(input) {
  return input && input.length > 0 ? false : true
}
