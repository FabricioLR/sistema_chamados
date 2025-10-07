import { polos } from "../database/database.js";
import { randomUUID } from "crypto";

function add_polo(nome: string, endereco: string){
    const id = randomUUID();
    const polo = {id, nome, endereco}
    polos.push(polo);
    return polo
}

export { add_polo };