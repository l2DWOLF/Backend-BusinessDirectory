import generateBizNum from "./generateBizNum.js";


const normalizeCard = async (card, userId) => {
    return{
        ...card,
        image: {
            url: card.image.url || 
            "https://cdn.pixabay.com/photo/2014/11/25/08/11/dollar-exchange-rate-544949_1280.jpg",
            alt: card.image.alt || "Business Card Image"
        },
        bizNumber: card.bizNumber || (await generateBizNum()),
        user_id: card.user_id || userId,
    }
};
export default normalizeCard;