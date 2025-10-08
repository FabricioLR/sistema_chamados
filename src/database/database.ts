import { randomUUID } from "crypto";

interface User{
    id: string,
    cpf: string,
    senha: string,
    nome: string,
    rule: string
};

var users: User[] = [
    {id: randomUUID(), cpf: "123.123.123-12", senha: "123456", nome: "fabricio", rule: "admin"},
    {id: randomUUID(), cpf: "123.123.123-13", senha: "123456", nome: "fabricio2", rule: "funcionario_polo"},
    {id: randomUUID(), cpf: "123.123.123-14", senha: "123456", nome: "fabricio3", rule: "tecnico"}
];

const polos = [];

const chamados = [];

function delete_user_db(id: string){
    users = users.filter(user => user.id != id); 
}
function add_user_db(user: Omit<User, "id">){
    const user_ = {...user, id: randomUUID()};
    users.push(user_);
    return user_;
}

export type { User };
export { users, polos, chamados, delete_user_db, add_user_db };