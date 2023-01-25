export const shortenAddress = (address: string, length = 5) => {
    return address.slice(0, length) + "..." + address.slice(-length)
}
export const shortNumber = (num: number, length = 2) => {
    if (!num) {
        return 0
    }
    if (typeof num === "number") {
        return num.toFixed(length)        
    } else {
        return num
    }
}