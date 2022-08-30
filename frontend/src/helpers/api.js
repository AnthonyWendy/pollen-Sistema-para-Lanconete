import Cookies from "js-cookie";
import qs from "qs";
import { doLogout } from "./authHandler";
// const BASEAPI = "http://192.168.129.122:5000";
const BASEAPI = "http://localhost:5000";

const apiFetchFile = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.append("token", token);
    }

    const response = await fetch(
        BASEAPI + endpoint,

        {
            method: "POST",
            body,
        }
    );

    const json = await response.json();

    if (json.notallowed) {
        doLogout();
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchPost = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(
        BASEAPI + endpoint,

        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify(body),
        }
    );
    const json = await response.json();

    if (json.notallowed) {
        doLogout();
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchPut = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(
        BASEAPI + endpoint,

        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify(body),
        }
    );

    const json = await response.json();

    if (json.notallowed) {
        doLogout();
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchGet = async (endpoint, body = []) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

    const json = await response.json();

    if (json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
};

const API = {
    login: async (email, password) => {
        const json = await apiFetchPost("/user/signin", { email, password });
        return json;
    },

    signup: async (name, email, isAdmin, password) => {
        const json = await apiFetchPost("/user/signup", {
            name,
            email,
            isAdmin,
            password,
        });
        return json;
    },

    getProduct: async (id) => {
        const json = await apiFetchGet(`/product/${id}`);
        return json;
    },

    getProducts: async (options) => {
        const json = await apiFetchGet("/product/list", options);
        return json;
    },

    updateProduct: async (body, id) => {
        const json = await apiFetchFile(`/product/${id}`, body);
        return json;
    },
    addProduct: async (fData) => {
        const json = await apiFetchFile("/product/add", fData);
        return json;
    },

    addIngredient: async (name) => {
        const json = await apiFetchPost("/ingredient/add", { name });
        return json;
    },

    addCategory: async (name) => {
        const json = await apiFetchPost("/category/add", { name });
        return json;
    },

    addFormasPagamentos: async (name) => {
        const json = await apiFetchPost("/formaspagamentos/add", { name });
        return json;
    },

    getCategories: async () => {
        const json = await apiFetchGet("/category/list");
        return json;
    },

    getIngredients: async () => {
        const json = await apiFetchGet("/ingredient/list");
        return json;
    },

    getIngredienteFromProduct: async (id) => {
        const json = await apiFetchGet(`/product/${id}/ingredients`);
        return json;
    },

    getFormaspagamentos: async () => {
        const json = await apiFetchGet("/formaspagamento/list");
        return json;
    },

    updateCategory: async (id, name) => {
        const json = await apiFetchPut(`/category/${id}`, { name });
        return json;
    },

    updateIngredient: async (id, name) => {
        const json = await apiFetchPut(`/ingredient/${id}`, { name });
        return json;
    },

    updateFormasPagamento: async (id, name) => {
        const json = await apiFetchPut(`/formaspagamento/${id}`, {name});
        return json;
    },

    toggleCategory: async (id) => {
        const json = await apiFetchPost("/category/toggle", { id });
        return json;
    },
    
    toggleFormaspagamentos: async (id) => {
        const json = await apiFetchPost("/formaspagamento/toggle", { id });
        return json;
    },

    putIngredientFormProduto: async (id, body) => {
        const json = await apiFetchPut(`/product/${id}/ingredients`, body);
        return json;
    },

    getUsers: async () => {
        const json = await apiFetchGet("/user/list");
        return json;
    },

    updateUser: async (id, body) => {
        const json = await apiFetchPut(`/user/${id}`, body);
        return json;
    },

    deleteUser: async (id) => {
        const json = await apiFetchPost("/user/delete", { id });
        return json;
    },

    addComanda: async (body) => {
        const json = await apiFetchPost("/comanda/add", body);
        return json;
    },

    getComandas: async () => {
        const json = await apiFetchGet("/comanda/list");
        return json;
    },

    getApi: () => {
        return BASEAPI;
    },
};

export default () => API;
