import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import newProduct from "./Pages/newProduct";
import NotFound from "./Pages/notFound";
import ProductPage from "./Pages/ProductPage";

import { Private } from "./components/Private";

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/*" element={<NotFound />} />
            <Route
                path="/product/add"
                element={<Private component={newProduct} />}
            />
        </Routes>
    );
};
