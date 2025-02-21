import _ from 'lodash';
import Card from "../models/mongodb/Cards.js";
import { createError } from '../../utils/errorHandlers.js';


const generateBizNum = async () => {
    let totalCards = await Card.countDocuments();
    if(totalCards >= 8999999){
        const error = new Error("Database Full Capacity - Unable to create more cards")
        error.status = 507;
        return createError("Mongoose Error", error);
    };

    let random = 0; 
    do{
        random = _.random(1000000, 9999999);
    } while(!uniqueBizNum(random));

    return random;
};

const uniqueBizNum = async (bizNumber) => {
    try {
        const bizNumExists = await Card.findOne({bizNumber});
        return Boolean(bizNumExists);
    } catch (error) {
        error = new Error("Connection Error")
        error.status = 507;
        return createError("Mongoose Error", error);
    };
};

export default generateBizNum;