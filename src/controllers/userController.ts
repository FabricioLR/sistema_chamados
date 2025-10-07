import express from "express"
import { create_token } from "../services/jwtService.js";
import { delete_user, get_user, get_user_by_cpf, get_users } from "../services/userService.js";

class UserController{
    public login(request: express.Request, response: express.Response){
        try {
            const { cpf, senha } = request.body;

            if (!cpf || !senha) return response.status(400).send({ error: "Cpf e senha devem ser informados" })

            const user = get_user_by_cpf(cpf);

            if (!user) return response.status(400).send({ error: "Usuário ou senha incorreta" });

            if (user?.senha != senha) return response.status(400).send({ error: "Usuário ou senha incorreta" });

            const token = create_token(user.id, user.nome, user.rule);

            return response.status(200).send({ user: {id: user.id, nome: user.nome, rule: user.rule}, token })   
        } catch (error) {
            console.log(error)
            return response.status(500).send({ error: "Internal server error" })
        }
    }

    public list_users(request: express.Request, response: express.Response){
        try {
            const users = get_users();

            return response.status(200).send({ users });
        } catch (error) {
            console.log(error)
            return response.status(500).send({ error: "Internal server error" })
        }
    }

    public delete(request: express.Request, response: express.Response){
        try {
            const id = request.params.id;
            const { userId } = response.locals;

            if (!id) return response.status(400).send({ error: "Id deve ser informado" });
            if (id == userId) return response.status(400).send({ error: "Não pode deleter você mesmo" });

            const user_ = get_user(id);

            if (!user_) return response.status(400).send({ error: "Usuário não encontrado" });

            delete_user(id);

            return response.status(200).send({});
        } catch (error) {
            console.log(error);
            return response.status(500).send({ error: "Internal server error" });
        }
    }
};

export { UserController };