import { expect, test } from "vitest"
import request from 'supertest';
import { app } from "../app.js"

test("POST /login with corret credentials return user", async () => {
    const response = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456"}).set('Content-Type', 'application/json');
    expect(response.body).toHaveProperty("user")
    expect(response.body).toHaveProperty("token")
    expect(response.statusCode).toBe(200);
});

test("POST /login with incorret credentials return error", async () => {
    const response = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456345"}).set('Content-Type', 'application/json');
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Usuário ou senha incorreta");
    expect(response.statusCode).toBe(400);
});

test("POST /login with incorret format of credentials return error", async () => {
    const response = await request(app).post('/login').send({cpf: "12312312312", senha: "123456345"}).set('Content-Type', 'application/json');
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Formato de cpf inválido");
    expect(response.statusCode).toBe(400);
});


test("POST /adicionar_usuario with admin rule", async () => {
    const response1 = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456"}).set('Content-Type', 'application/json');

    const response2 = await request(app).post("/adicionar_usuario").send({cpf: "123.123.123-00", nome: "fabricioteste", rule: "admin"}).set("authorization", response1.body.token).set('Content-Type', 'application/json');
    expect(response2.body).toHaveProperty("user");
    expect(response2.statusCode).toBe(200);
})

test("POST /adicionar_usuario without admin rule", async () => {
    const response1 = await request(app).post('/login').send({cpf: "123.123.123-14", senha: "123456"}).set('Content-Type', 'application/json');

    const response2 = await request(app).post("/adicionar_usuario").send({cpf: "123.123.123-00", nome: "fabricioteste", rule: "admin"}).set("authorization", response1.body.token).set('Content-Type', 'application/json');
    expect(response2.body).toHaveProperty("error");
    expect(response2.body.error).toBe("Usuário sem permissão");
    expect(response2.statusCode).toBe(400);
})

test("POST /adicionar_usuario with cpf already used", async () => {
    const response1 = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456"}).set('Content-Type', 'application/json');

    const response2 = await request(app).post("/adicionar_usuario").send({cpf: "123.123.123-13", nome: "fabricioteste", rule: "admin"}).set("authorization", response1.body.token).set('Content-Type', 'application/json');
    expect(response2.body).toHaveProperty("error");
    expect(response2.body.error).toBe("Cpf já cadastrado");
    expect(response2.statusCode).toBe(400);
})

test("POST /adicionar_usuario with incorrect rule", async () => {
    const response1 = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456"}).set('Content-Type', 'application/json');

    const response2 = await request(app).post("/adicionar_usuario").send({cpf: "123.123.123-13", nome: "fabricioteste", rule: "admin_teste"}).set("authorization", response1.body.token).set('Content-Type', 'application/json');
    expect(response2.body).toHaveProperty("error");
    expect(response2.body.error).toBe("Cargo inexistente");
    expect(response2.statusCode).toBe(400);
})

test("POST /adicionar_polo", async () => {
    const response1 = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456"}).set('Content-Type', 'application/json');

    const response2 = await request(app).post("/adicionar_polo").send({nome: "Ceilândia Centro", endereco: "ceilandia-centro-df"}).set("authorization", response1.body.token).set("Content-Type", "application/json");
    expect(response2.body).toHaveProperty("polo");
    expect(response2.statusCode).toBe(200);
});

test("POST /adicionar_polo whitout admin rule", async () => {
    const response1 = await request(app).post('/login').send({cpf: "123.123.123-13", senha: "123456"}).set('Content-Type', 'application/json');

    const response2 = await request(app).post("/adicionar_polo").send({nome: "Ceilândia Centro", endereco: "ceilandia-centro-df"}).set("authorization", response1.body.token).set("Content-Type", "application/json");
    expect(response2.body).toHaveProperty("error");
    expect(response2.statusCode).toBe(400);
});