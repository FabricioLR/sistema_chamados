import express from "express";
import { get_user } from "../services/userService.js";
import { add_polo } from "../services/poloService.js";

class PoloController{
    public adicionar_polo(request: express.Request, response: express.Response){
        try {
            const { nome, endereco } = request.body;
            const { userId } = response.locals;

            if (!nome || !endereco) return response.status(400).send({ error: "Nome e endereço devem ser informados" });

            const polo = add_polo(nome, endereco);

            return response.status(200).send({polo});
        } catch (error) {
            return response.status(500).send({ error: "Internal server error" });
        }
    }
};

export { PoloController };