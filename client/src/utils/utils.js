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
    let readableDate = `${MM.slice(-2)}-${DD.slice(-2)}-${YYYY}`;

    return readableDate;
}

// function to convert epoch date to MM/DD/YYYY format
export function epochToYYYYMMDD(epoch) {
    let epochDate = new Date(epoch);
    let MM = `0${epochDate.getMonth() + 1}`;
    let DD = `0${epochDate.getDate()}`;
    let YYYY = epochDate.getFullYear();
    let readableDate = `${YYYY}-${MM.slice(-2)}-${DD.slice(-2)}`;

    return readableDate;
}

export function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function generateArrayOfColors(num) {
    let colorArray = []
    for (let i = 0; i < num; i++) {
        colorArray.push(generateRandomColor())
    }
    return colorArray;
}

export const colorPaletteBlue = ['#0C35BD', '#4A6AD2', '#234BD0', '#092991', '#061F71']
export const colorPaletteGreen = ['#0C930C', '#45C045', '#20B320', '#007800', '#005700']
export const colorPaletteBoth = ['#0C35BD', '#4A6AD2', '#061F71','#0C930C', '#45C045', '#005700']
