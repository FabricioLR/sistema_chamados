import express from "express";
import { get_user } from "../services/userService.js";

function verify_admin_middleware(request: express.Request, response: express.Response, next: express.NextFunction){
    const { userId } = response.locals;

    try {
        const user = get_user(userId);
    
        if (!user) return response.status(400).send({ error: "Usuário administrador não encontrado" });
        if (user.rule != "admin") return response.status(400).send({ error: "Usuário sem permissão" });
    
        return next();
    } catch (error) {
        return response.status(400).send({ error: "Admin verification error" });
    }
}

export { verify_admin_middleware };