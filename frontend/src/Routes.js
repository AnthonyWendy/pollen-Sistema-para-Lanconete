import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/signUp";

import newProduct from "./Pages/newProduct";
import NotFound from "./Pages/notFound";
import ProductPage from "./Pages/ProductPage";
import UpdateProduct from "./Pages/updateProduct";
import UpdateCategory from "./Pages/updateCategory";
import UpdateIngredient from "./Pages/updateIngredient";
import UpdateUser from "./Pages/updateUser";
import AddIngredient from "./Pages/Ingredient/AddIngredient";
import AddCategory from "./Pages/Categoria/AddCategory";
import AddFormasPagamento from "./Pages/addFormasPagamentos";
import UpdateFormasPagamento from "./Pages/updateFormasPagamentos";
import Principal from "./Pages/Principal";
import AddPedido from "./Pages/Pedidos/add";
import UpdatePedido from "./Pages/Pedidos/Update";
import ListComandas from "./Pages/PedidoPage";

import { Private } from "./components/Private";

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Private component={SignUp} />} />

            <Route path="/product/:id" element={<ProductPage />} />
            <Route
                path="/product/add"
                element={<Private component={newProduct} />}
            />
            <Route
                path="/category/add/"
                element={<Private component={AddCategory} />}
            />

            <Route
                path="/product/edit/:id"
                element={<Private component={UpdateProduct} />}
            />

            <Route
                path="/ingredient/add"
                element={<Private component={AddIngredient} />}
            />

            <Route
                path="/category/update"
                element={<Private component={UpdateCategory} />}
            />

            <Route
                path="/formaspagamento/add"
                element={<Private component={AddFormasPagamento} />}
            />

            <Route
                path="/ingredient/update"
                element={<Private component={UpdateIngredient} />}
            />

            <Route
                path="/user/update"
                element={<Private component={UpdateUser} />}
            />

            <Route
                path="/formaspagamento/update"
                element={<Private component={UpdateFormasPagamento} />}
            />

            <Route
                path="/principal"
                element={<Private component={Principal} />}
            />

            <Route 
                path="/comanda/add"
                element={<Private component={AddPedido}/>}
            />

            <Route 
                path="/comanda/update/:id"
                element={<Private component={UpdatePedido}/>}
            />

            <Route 
                path="/comanda/list"
                element={<Private component={ListComandas}/>}
            />

            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};
