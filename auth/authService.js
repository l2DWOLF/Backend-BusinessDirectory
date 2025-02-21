import { getOneUser } from "../users/models/userAccessDataService.js";
import { createError, handleError } from "../utils/errorHandlers.js";
import { verifyToken } from "./providers/jwt.js";
import config from 'config';

const tokenGenerator = config.get("TOKEN_GENERATOR");

const auth = async (req, res, next) => {
    if(tokenGenerator === "jwt"){
        try {
            const tokenFromClient = req.header("x-auth-token");
            if(!tokenFromClient){
                const error = new Error("Missing Token, Please Login")
                error.status = 499; 
                return createError("Authentication", error);
            };
            const userInfo = verifyToken(tokenFromClient);
            if(!userInfo)
            {
                const error = new Error("Token Authentication Failed, Please Login")
                error.status = 498;
                return createError("Authentication", error);
            };
            let validUser = await getOneUser(userInfo._id);
            if (!validUser) {
                const error = new Error("Expired Token! User Doesn't Exist - Please Register")
                error.status = 401;
                return createError("Authentication", error);
            }
            
            req.user = userInfo; 
            return next(); 
        } catch (error) {
            return handleError(res, error.status || 401, error.message);
        };
    };
return handleError(res, 500, "Error: The server couldn't use a token generator.");
};
export default auth; 