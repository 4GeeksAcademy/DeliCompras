import React from "react";
import injectContext from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";

import { Categorias } from "./pages/categorias.jsx";
import { Crear_categorias } from "./pages/create_category.jsx";
import { Modificar_categorias } from "./pages/modificar_categorias.jsx";

import { Restaurantes } from "./pages/restaurantes.jsx";
import { Crear_restaurantes } from "./pages/create_restaurants.jsx";
import { Modificar_restaurantes } from "./pages/modificar_restaurantes.jsx";

import { Sucursales } from "./pages/sucursales.jsx";
import { Crear_sucursales } from "./pages/create_sucursale.jsx";
import { Modificar_sucursales } from "./pages/modificar_sucursales.jsx";


import { Products } from "./pages/products.jsx";
import { Create_productos } from "./pages/create_product.jsx";
import { Modificar_productos } from "./pages/modificar_producto.jsx";

import { User_registration } from "./pages/user_registration.jsx";
import { User_login } from "./pages/user_login.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes> 
                        <Route element={<Home />} path="/" />
                        <Route element={<Sucursales />} path="/sucursales" />
                        <Route element={<Crear_sucursales />} path="/crear_sucursales" />
                        <Route element={<Modificar_sucursales />} path="/modificar_sucursales/:theid" />
                        <Route element={<Restaurantes />} path="/restaurantes" />
                        <Route element={<Crear_restaurantes />} path="/crear_restaurantes" />
                        <Route element={<Modificar_restaurantes />} path="/modificar_restaurantes/:theid" />
                        <Route element={<Categorias />} path="/categorias" />
                        <Route element={<Crear_categorias />} path="/crear_categorias" />
                        <Route element={<Modificar_categorias />} path="/modificar_categorias/:theid" />
                        <Route element={<Products />} path="/products" />
                        <Route element={<Create_productos />} path="/create" />
                        <Route element={<Modificar_productos />} path="/modificar/:id" />
                        <Route element={<Crear_restaurantes />} path="/user_registration" />
                        <Route element={<User_login />} path="/user_login" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);