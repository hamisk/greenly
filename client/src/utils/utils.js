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

export function getWeekCommencing(date) {
    date = new Date(date);
    const day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(date.setDate(diff));
}

// function to convert epoch date to MM/DD/YYYY format
export function epochToMMDDYYYY(epoch) {
    let epochDate = new Date(epoch);
    let MM = `0${epochDate.getMonth() + 1}`;
    let DD = `0${epochDate.getDate()}`;
    let YYYY = epochDate.getFullYear();
    let readableDate = `${MM.slice(-2)}/${DD.slice(-2)}/${YYYY}`;

    return readableDate;
}