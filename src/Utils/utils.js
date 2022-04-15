export const stringToDate = (dateString) => {
    let parts = dateString.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

export const acceptableDate = (dateString, dateToCompare) => {

    const date = stringToDate(dateString);
    dateToCompare === undefined && (dateToCompare = new Date(Date.now()));

    typeof dateToCompare === "string" && (dateToCompare = stringToDate(dateToCompare));
    
    const valid = date.getDate() === dateToCompare.getDate() &&
    date.getMonth() === dateToCompare.getMonth() &&
    date.getFullYear() === dateToCompare.getFullYear();

    if (valid) return true;
    return date >= dateToCompare;
}

export const dateToString = (date) => {
    const myDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };
    return `${myDate.year}-${myDate.month < 10 ? '0' : ''}${myDate.month}-${myDate.day < 10 ? '0' : ''}${myDate.day}`;
}

export const StyleModal1 = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '35%',
        transform: 'translate(-40%, -20%)',

        height: 'auto',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '6px',
        outline: 'none',
        padding: '20px',
        position: 'relative',
    },
    overlay: {
        position: 'fixed',
    }
};