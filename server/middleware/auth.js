import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns a userid that was embedded in token when it was generated

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) return res.json({ success: false, message: "User not found" });

        req.user = user;
        next();
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
};
