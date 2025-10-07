const BASE_URL = "http://localhost:8000"

async function login(cpf, senha){
    if (!cpf || !senha) return "Cpf e senha devem ser informados corretamente";

    try {
        const response = await fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cpf, senha})
        });

        if (response.status == 200){
            const data = await response.json();

            sessionStorage.setItem("TOKEN", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            document.location.href = "index.html";

            return "success";
        } else {
            const data = await response.json();
            return data.error;
        }
    } catch (error) {
        console.log(error);
    }
}

function logout(){
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("user");

    document.location.href = "login.html";
}

function is_logged_in(){
    return {
        user: JSON.parse(sessionStorage.getItem("user")),
        token: sessionStorage.getItem("TOKEN")
    };
}

async function get_polos(){
    try {
        const response = await fetch("/listar_polos");
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function get_users(){
    try {
        const response = await fetch("/listar_usuarios", {
            headers: {
                "authorization": sessionStorage.getItem("TOKEN") 
            }
        });
        const data = await response.json();

        if (response.status != 200){
            alert(data.error);
            return [];
        }

        return data.users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function delete_user(id){
    try {
        const response = await fetch("/deletar_usuario/" + id, {
            headers: {
                "authorization": sessionStorage.getItem("TOKEN")
            }
        });
        const data = await response.json();

        if (response.status != 200){
            alert(data.error);
            return 0;
        }

        return 1;
    } catch (error) {
        alert(error)
        return 0;
    }
}