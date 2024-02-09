export function percentDifference(a, b) {
    let sum = +(100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2)
    return a>b ? '-' + sum : sum;
   }

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}