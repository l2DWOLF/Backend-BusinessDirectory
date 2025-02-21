import cors from 'cors';

const corsMiddleware = cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5173", "http://localhost:5174", "https://backend-businessdirectory.onrender.com"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    preflightContinue: false,
});
export default corsMiddleware;