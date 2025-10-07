import express from "express";
import jwt from "jsonwebtoken";
import { verify_token } from "../services/jwtService.js";

function verify_token_middleware(request: express.Request, response: express.Response, next: express.NextFunction){
    const token = request.headers["authorization"];
    if (!token) return response.status(400).send({ error: "No token provided" });
    
    try {
        const decoded = verify_token(token.replace("Bearer ", "")) as jwt.JwtPayload;
        if (!decoded) return response.status(400).send({ error: "Invalid token" });
    
        response.locals.userId = decoded.id;
        return next();
    } catch (error) {
        return response.status(400).send({ error: "Token verification error" });
    }
}

export { verify_token_middleware };