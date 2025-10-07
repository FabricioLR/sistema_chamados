import { expect, test } from "vitest"
import request from 'supertest';
import { app } from "../app.js"

test("POST /login return user", async () => {
    const response = await request(app).post('/login').send({cpf: "123.123.123-12", senha: "123456"}).set('Content-Type', 'application/json');
    expect(response.body).toHaveProperty("user")
    expect(response.body).toHaveProperty("token")
    expect(response.statusCode).toBe(200);
});

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