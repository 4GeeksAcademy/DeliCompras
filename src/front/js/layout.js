import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Categorias } from "./pages/categorias.jsx";
import { Crear } from "./pages/crear.jsx";
import { Modificar_categorias } from "./pages/modificar_categorias.jsx";

import { Restaurantes } from "./pages/restaurantes.jsx";
import { Crear_restaurantes } from "./pages/crear_restaurantes.jsx";
import { Modificar_restaurantes } from "./pages/modificar_restaurantes.jsx";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Products } from "./pages/products.jsx";
import { Create } from "./pages/create.jsx";
import { Modificar } from "./pages/modificar.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Restaurantes />} path="/restaurantes" />
                        <Route element={<Crear_restaurantes />} path="/crear_restaurantes" />
                        <Route element={<Modificar_restaurantes />} path="/modificar_restaurantes/:theid" />
                        <Route element={<Categorias />} path="/categorias" />
                        <Route element={<Crear />} path="/crear" />
                        <Route element={<Modificar_categorias />} path="/modificar_categorias/:theid" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Products />} path="/products" />
                        <Route element={<Modificar />} path="/modificar/:id" />
                        <Route element={<Create />} path="/create" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
