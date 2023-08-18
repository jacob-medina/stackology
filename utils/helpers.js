const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = {
    format_date: (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = MONTHS[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
};