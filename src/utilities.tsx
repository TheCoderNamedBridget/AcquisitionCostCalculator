

/**
 * Formats num to numDecimalPlaces
 * @param num 
 */
export function formatNum(num: number, numDecimalPlaces: number = 2) {
    return Number(num.toFixed(numDecimalPlaces))
}