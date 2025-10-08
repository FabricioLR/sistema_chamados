import { Router } from "express"
import { UserController } from "./controllers/userController.js";
import { PoloController } from "./controllers/poloController.js";
import { verify_token_middleware } from "./middlewares/tokenMiddleware.js";
import { verify_admin_middleware } from "./middlewares/adminMiddleware.js";

const router = Router();

const userController = new UserController();
const poloController = new PoloController();

router.post("/login", userController.login);
router.post("/adicionar_usuario", verify_token_middleware, verify_admin_middleware, userController.add);
router.get("/listar_usuarios", verify_token_middleware, verify_admin_middleware, userController.list_users);
router.get("/deletar_usuario/:id", verify_token_middleware, verify_admin_middleware, userController.delete);

//router.get("listar_polos", poloController.list_polos);
router.post("/adicionar_polo", verify_token_middleware, verify_admin_middleware, poloController.adicionar_polo);
//router.post("/remover_polo")
//router.post("/atualizar_polo")

export { router };