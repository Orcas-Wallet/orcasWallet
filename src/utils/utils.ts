export const shortenAddress = (address: string, length = 5) => {
    return address.slice(0, length) + "..." + address.slice(-length)
}
export const shortNumber = (num: number, length = 2) => {
    return num.toFixed(length)
}