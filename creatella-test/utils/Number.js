import { isNil } from './Check'

// convert price format, from cent to dollar
export function centToDollar(input) {
  if(isNil(input)) {                          // cent value is null or undefined, then no need to display price
    return 'Unspecified'
  } else if(input === '0' || input === 0) {   // cent value is zero, then convert to 'Free'
    return 'Free'
  } else {                                    // cent format is correct, then convert accordingly
    return '$' + input / 100
  }
}
