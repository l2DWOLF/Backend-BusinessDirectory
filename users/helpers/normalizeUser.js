

const normalizeUser = async (user) => {
    return {
        ...user,
        image: {
            url: user.image.url ||
                "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            alt: user.image.alt || "Profile Image"
        },
        isBusiness: user.isBusiness || false,
        isAdmin: user.isAdmin || false,
    }
};
export default normalizeUser;