import { isNil } from './Check'

// convert price format, from cent to dollar
export function centToDollar(input) {
  if(isNil(input)) {                          // cent value is null or undefined, then no need to display price
    return 'Unspecified'
  } else if(input === '0' || input === 0) {   // cent value is zero, then convert to 'Free'
    return 'Free'
  } else {                                    // cent format is correct, then convert accordingly
    let output = '$' + (input / 100)

    // normalize dollar format, keeps two numbers behind comma
    let n = output.split('.')
    if(isNil(n[1])) output = output + '.00'
    else if(n[1].length === 1) output = output + '0'  

    return output
  }
}
