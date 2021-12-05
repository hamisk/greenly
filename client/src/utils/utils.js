export function round(value) {
    return Math.round(value * 10) / 10;
}

export function groupArrayBy (objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        let key = obj[property]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})
}