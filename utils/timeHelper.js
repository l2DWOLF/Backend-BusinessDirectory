
function normalizeStamper(number){
    return number.toString().padStart(2,"0");
};

const timeStamper = () => {
    const now = new Date();
    let result = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    };
    for (const key in result) {
        result[key] = normalizeStamper(result[key]);
    };

    return result;
};
export default timeStamper;