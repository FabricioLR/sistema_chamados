import jwt from "jsonwebtoken";
import "dotenv/config"

function create_token(id: string, nome: string, rule: string){
    return jwt.sign({id, nome, rule}, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

function verify_token(token: string){
    return jwt.verify(token, process.env.JWT_SECRET as string);
}

export { create_token, verify_token };