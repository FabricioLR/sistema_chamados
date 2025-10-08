import { add_user_db, delete_user_db, users, type User } from "../database/database.js";

function add_user(cpf: string, nome: string, rule: string){
    const senha = cpf.replaceAll(".", "").replaceAll("-", "");
    const user = add_user_db({cpf, nome, rule, senha});
    return {id: user.id, nome: user.nome, rule: user.rule}
}

function get_user(id: string): User | undefined{
    return users.find(user => user.id == id);
}

function get_user_by_cpf(cpf: string): User | undefined{
    return users.find(user => user.cpf == cpf);
}

function get_users(){
    const users_ = [];
    for (var user of users){
        users_.push({id: user.id, nome: user.nome, rule: user.rule});
    }
    return users_;
}

function delete_user(id: string){
    delete_user_db(id);
}

export { get_user, get_user_by_cpf, get_users, delete_user, add_user };