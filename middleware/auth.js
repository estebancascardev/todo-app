import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userExtractor = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.sendStatus(401);
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
    } catch (error) {
        return res.sendStatus(403);
    }
    next();
};

export default userExtractor;