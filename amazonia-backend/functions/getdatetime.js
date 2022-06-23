const getdatetime = (date) => {
    return ({
        yyyy: date.getUTCFullYear(),
        yy: date.getUTCFullYear().toString().substring(2),
        MM: date.getUTCMonth() + 1,
        dd: date.getUTCDate(),
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
    })
}

exports.getdatetime = getdatetime;

